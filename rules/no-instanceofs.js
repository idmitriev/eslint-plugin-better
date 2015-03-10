module.exports = function(context) {
	return {
		'UnaryExpression': function(node) {
			return node.operator === 'instanceof' ?
				context.report(node, 'Unexpected instanceof operator') :
				undefined;
		}
	};
};