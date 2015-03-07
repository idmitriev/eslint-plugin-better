module.exports = function(context) {
	return {
		'FunctionExpression': function(node) {
			return context.report(node, 'Unexpected function expression, use fat arrow expression instead')
		}
	}
}