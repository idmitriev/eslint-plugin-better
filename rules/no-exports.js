module.exports = function(context) {
	return [
		'ExportNamedDeclaration',
		'ExportDefaultDeclaration',
		'ExportAllDeclaration'
	].reduce(function(acc, statement){
			acc[statement] = function(node) {
				return context.report(node, 'Unexpected export declaration, use CJS module.exports instead');
			};
			return acc;
		}, {});
}