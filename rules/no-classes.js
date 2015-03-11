module.exports = function(context) {
	return {
		'Class': function(node) {
			return context.report(node, 'Unexpected class');
		}
	}
}