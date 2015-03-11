module.exports = function(context) {
	return {
		'NewExpression': function(node) {
			context.report(node, 'Unexpected "new" expression');
		}
	};
};