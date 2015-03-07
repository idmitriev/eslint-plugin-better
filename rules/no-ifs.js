module.exports = function(context) {
	return {
		'IfStatement': function(node) {
			return context.report(node, 'Unexpected if statement, use ternary expression instead');
		}
	}
}