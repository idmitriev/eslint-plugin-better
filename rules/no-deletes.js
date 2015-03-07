module.exports = function(context) {
	return {
		'UnaryExpression': function(node) {
			if (node.operator === 'delete') {
				context.report(node, 'Unexpected delete operator');
			}
		}
	};
};