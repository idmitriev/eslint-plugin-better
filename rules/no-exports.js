module.exports = function(context) {
	return {
		'ExportStatement': function(node) {
			return context.report(node, 'Unexpected export statement, use CJS module.exports object instead');
		}
	}
}