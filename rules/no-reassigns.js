module.exports = function(context) {
	return {
		'AssignmentExpression': function(node) {
			context.report(node, 'Unexpected variable reassignment');
		}
	};
}