module.exports = function(context) {
	return {
		"Null": function(node) {
			return context.report(node, 'Unexpected null, use undefined instead');
		}
	};
};