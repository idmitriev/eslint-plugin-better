module.exports = function(context) {
	var functions = [];
	function enterFunction(node) {
		functions.push(node);
	}
	function exitFunction(node) {
		if ( functions[functions.length - 1] === node) {
			context.report(node, 'Does not have explicit return value');
		}
	}
	
	return {
		'Program': enterFunction,
		'FunctionDeclaration': enterFunction,
		'FunctionExpression': enterFunction,
		'ArrowFunctionExpression': enterFunction,

		'Program:exit': exitFunction,
		'FunctionDeclaration:exit': exitFunction,
		'FunctionExpression:exit': exitFunction,
		'ArrowFunctionExpression:exit': exitFunction,

		'ReturnStatement': function(node) {
			functions.pop();
		}
	};
};