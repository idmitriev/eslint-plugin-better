module.exports = function(context) {
	return {
		'UnaryExpression': function(node) {
			return node.operator === 'typeof' ?
				context.report(node, 'Unexpected typeof operator') :
				undefined;
		}
	};
};