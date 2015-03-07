module.exports = function(context) {
	return {
		'ThisExpression': function(node) {
			return context.report(node, 'Unexpected this expression')
		}
	}
}
