const toCamelCase = function(text) {
	// return text;
	return text.replace(/([-_][a-z])/ig, ($1) => {
		return $1.toUpperCase()
			.replace('-', '')
			.replace('_', '');
	});
};
const toPascalCase = function(text) {
	const temp = toCamelCase(text);
	return temp.substr(0, 1).toUpperCase() + temp.substr(1);
	return text;
};
module.exports = { toCamelCase, toPascalCase };