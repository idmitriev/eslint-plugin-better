module.exports = function(context) {
	return [
		'ForStatement',
		'ForInStatement',
		'ForOfStatement'
	].reduce(function(acc, statement){
		acc[statement] = function(node) {
			return context.report(node, 'Unexpected for statement, use array iteration methods instead');
		};
		return acc;
	}, {});
}