module.exports = function(context) {
	return {
		'ClassStatement': function(node) {
			return context.report(node, 'Unexpected class statement');
		}
	}
}