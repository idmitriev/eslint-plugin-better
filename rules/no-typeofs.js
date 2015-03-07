module.exports = function(context) {
	return {
		'UnaryExpression': function(node) {
			if (node.operator === 'typeof') {
				context.report(node, 'Unexpected typeof operator');
			}
		}
	};
};