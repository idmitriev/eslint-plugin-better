module.exports = function(context) {
	return {
		'WithStatement': function(node) {
			return context.report(node, 'Unexpected with statement');
		}
	}
}