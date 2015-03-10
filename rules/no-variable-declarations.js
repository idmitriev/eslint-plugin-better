module.exports = function(context) {
	return {
		'VariableDeclaration': function (node) {
			return ['var', 'let'].indexOf(node.kind) !== -1 ?
				context.report(node, 'Unexpected variable declaration, use const instead') :
				undefined;
		}
	};
};