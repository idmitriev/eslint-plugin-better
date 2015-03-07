module.exports = function(context) {
	return {
		"Identifier": function(node) {
			if ( node.value === 'undefined' ) {
				return context.report(node, 'Unexpected undefined, use null instead');
			}
		}
	};
};