module.exports = function(context) {
	return {
		'UnaryExpression': function(node) {
			if (node.operator === 'instanceof') {
				context.report(node, 'Unexpected instanceof operator');
			}
		}
	};
};