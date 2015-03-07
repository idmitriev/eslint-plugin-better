module.exports = function(context) {
	return {
		'SwitchStatement': function(node) {
			return context.report(node, 'Unexpected switch statement, use pattern matching library instead');
		}
	}
}