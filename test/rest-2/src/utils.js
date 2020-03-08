const SANITIZATION_RULES = {
	array(input) {
		if (Array.isArray(input)) {
			throw new Error("Should be array");
		}
		return input;
	},
	json(input) {
		return JSON.parse(input);
	},
	number(input) {
		return parseFloat(input);
	},
	float(input) {
		return parseFloat(input);
	},
	integer(input) {
		return parseInt(input);
	},
	undefined(input) {
		if (typeof input !== "undefined") {
			throw new Error("Should be undefined");
		}
		return input;
	},
	defined(input) {
		if (typeof input === "undefined") {
			throw new Error("Should not be undefined");
		}
		return input;
	},

}

module.exports = {

	toIterator(parameters) {
		Object.assign(parameters, {
			index: 0,
			output: parameters,
			exit: false,
			next() {
				if (parameters.index < parameters.lifecycle.length) {
					if (parameters.exit) {
						return parameters.ok(parameters.output);
					}
					const output = parameters.scope[parameters.lifecycle[parameters.index++]](parameters);
					if (output instanceof Promise) {
						return output.then(parameters.next).catch(parameters.fail);
					}

					return setImmediate(parameters.next);
				} else {
					return parameters.ok(parameters.output);
				}
			}
		});
		return parameters;
	},

	findIn(object, selectors, defValue = undefined) {
		const selector = [].concat(selectors);
		let selected = object;
		for (let index = 0; index < selector.length; index++) {
			if (!(selector[index] in selected)) {
				return defValue;
			}
			selected = selected[selector[index]];
		}
		return selected;
	},

	findInAny(objects, selectors, defValue = undefined) {
		const selector = [].concat(selectors);
		ObjectIteration:
			for (let indexObjects = 0; indexObjects < objects.length; indexObjects++) {
				let selected = objects[indexObjects];
				for (let index = 0; index < selector.length; index++) {
					if (!(selector[index] in selected)) {
						continue ObjectIteration;
					}
					selected = selected[selector[index]];
				}
				return selected;
			}
		return defValue;
	},

	toCamelCase: function(text) {
		// return text;
		return text.replace(/([-_][a-z])/ig, ($1) => {
			return $1.toUpperCase()
				.replace('-', '')
				.replace('_', '');
		});
	},

	toPascalCase: function(text) {
		const temp = this.toCamelCase(text);
		return temp.substr(0, 1).toUpperCase() + temp.substr(1);
	},

	fromRowsToObject(rows, table, columnId) {
		const ids = [];
		const objs = []
		const column = table + "." + columnId;
		let otherColumns = null;
		rows.forEach(row => {
			if (ids.indexOf(row[column]) === -1) {
				ids.push(row[column]);
				if (otherColumns === null) {
					otherColumns = Object.keys(row).filter(aColumn => aColumn.startsWith(table + "."));
				}
				const product = otherColumns.reduce((output = {}, otherColumn) => {
					output[otherColumn.replace(table + ".", "")] = row[otherColumn];
					return output;
				}, {});
				objs.push(product);
			}
		});
		return objs;
	},

	toSanitization(rules, value, valueOnError) {
		return rules.split(",").reduce((output, ruleBrute) => {
			const rule = ruleBrute.replace(/^\!/g, "");
			const isNegated = ruleBrute.startsWith("!");
			if (arguments.length < 3) {
				return SANITIZATION_RULES[rule](output);
			}
			try {
				return SANITIZATION_RULES[rule](output);
			} catch (error) {
				return valueOnError;
			}
		}, value);
	},

	pad(size, str) {
		let s = String(str);
		while (s.length < (size || 2)) {
			s = "0" + s;
		}
		return s;
	},



}