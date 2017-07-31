/**
 * @fileoverview Rule to flag consistent return values
 * @author Nicholas C. Zakas
 *
 * Copyright JS Foundation and other contributors, https://js.foundation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const upperFirst = require('lodash.upperfirst');

const astUtils = require("eslint/lib/ast-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks whether or not a given node is an `Identifier` node which was named a given name.
 * @param {ASTNode} node - A node to check.
 * @param {string} name - An expected name of the node.
 * @returns {boolean} `true` if the node is an `Identifier` node which was named as expected.
 */
function isIdentifier(node, name) {
    return node.type === "Identifier" && node.name === name;
}

/**
 * Checks whether or not a given code path segment is unreachable.
 * @param {CodePathSegment} segment - A CodePathSegment to check.
 * @returns {boolean} `true` if the segment is unreachable.
 */
function isUnreachable(segment) {
    return !segment.reachable;
}

/**
* Checks whether a given node is a `constructor` method in an ES6 class
* @param {ASTNode} node A node to check
* @returns {boolean} `true` if the node is a `constructor` method
*/
function isClassConstructor(node) {
    return node.type === "FunctionExpression" &&
        node.parent &&
        node.parent.type === "MethodDefinition" &&
        node.parent.kind === "constructor";
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "require `return` statements to either always or never specify values",
            category: "Best Practices",
            recommended: false
        },

        schema: [{
            type: "object",
            properties: {
                treatUndefinedAsUnspecified: {
                    type: "boolean"
                }
            },
            additionalProperties: false
        }]
    },

    create(context) {
        const options = context.options[0] || {};
        const treatUndefinedAsUnspecified = options.treatUndefinedAsUnspecified === true;
        let funcInfo = null;

        /**
         * Checks whether of not the implicit returning is consistent if the last
         * code path segment is reachable.
         *
         * @param {ASTNode} node - A program/function node to check.
         * @returns {void}
         */
        function checkLastSegment(node) {
            let loc, name;

            /*
             * Skip if it expected no return value or unreachable.
             * When unreachable, all paths are returned or thrown.
             */
            if (!funcInfo.hasReturnValue ||
                funcInfo.codePath.currentSegments.every(isUnreachable) ||
                astUtils.isES5Constructor(node) ||
                isClassConstructor(node)
            ) {
                return;
            }

            // Adjust a location and a message.
            if (node.type === "Program") {

                // The head of program.
                loc = { line: 1, column: 0 };
                name = "program";
            } else if (node.type === "ArrowFunctionExpression") {

                // `=>` token
                loc = context.getSourceCode().getTokenBefore(node.body, astUtils.isArrowToken).loc.start;
            } else if (
                node.parent.type === "MethodDefinition" ||
                (node.parent.type === "Property" && node.parent.method)
            ) {

                // Method name.
                loc = node.parent.key.loc.start;
            } else {

                // Function name or `function` keyword.
                loc = (node.id || node).loc.start;
            }

            if (!name) {
                name = astUtils.getFunctionNameWithKind(node);
            }

            // Reports.
            context.report({
                node,
                loc,
                message: "Expected to return a value at the end of {{name}}.",
                data: { name }
            });
        }

        return {

            // Initializes/Disposes state of each code path.
            onCodePathStart(codePath, node) {
                funcInfo = {
                    upper: funcInfo,
                    codePath,
                    hasReturn: false,
                    hasReturnValue: false,
                    message: "",
                    node
                };
            },
            onCodePathEnd() {
                funcInfo = funcInfo.upper;
            },

            // Reports a given return statement if it's inconsistent.
            ReturnStatement(node) {
                const argument = node.argument;
                let hasReturnValue = Boolean(argument);

                if (treatUndefinedAsUnspecified && hasReturnValue) {
                    hasReturnValue = !isIdentifier(argument, "undefined") && argument.operator !== "void";
                }

                if (!funcInfo.hasReturn) {
                    funcInfo.hasReturn = true;
                    funcInfo.hasReturnValue = hasReturnValue;
                    funcInfo.message = "{{name}} expected {{which}} return value.";
                    funcInfo.data = {
                        name: funcInfo.node.type === "Program"
                            ? "Program"
                            : upperFirst(astUtils.getFunctionNameWithKind(funcInfo.node)),
                        which: hasReturnValue ? "a" : "no"
                    };
                } else if (funcInfo.hasReturnValue !== hasReturnValue) {
                    context.report({
                        node,
                        message: funcInfo.message,
                        data: funcInfo.data
                    });
                }
            },

            // Reports a given program/function if the implicit returning is not consistent.
            "Program:exit": checkLastSegment,
            "FunctionDeclaration:exit": checkLastSegment,
            "FunctionExpression:exit": checkLastSegment,
            "ArrowFunctionExpression:exit": checkLastSegment
        };
    }
};
