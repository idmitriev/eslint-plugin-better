module.exports = function(context) {
	return {
		'UnaryExpression': function(node) {
			return node.operator === 'delete' ?
				context.report(node, 'Unexpected delete operator') :
				undefined;
		}
	};
};