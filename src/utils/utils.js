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
const findIn = function(object, selectors, defValue = undefined) {
	const selector = [].concat(selectors);
	let selected = object;
	for (let index = 0; index < selector.length; index++) {
		if (!(selector[index] in selected)) {
			return defValue;
		}
		selected = selected[selector[index]];
	}
	return selected;
};
module.exports = { toCamelCase, toPascalCase, findIn };