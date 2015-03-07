module.exports = function(context) {
	return {
		'ImportStatement': function(node) {
			return context.report(node, 'Unexpected import statement, use CJS require function instead');
		}
	}
}