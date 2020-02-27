const { toCamelCase, toPascalCase } = require(__dirname + "/utils.js");
const allTypes = {
	boolean: ["BIT", "TINYINT"],
	spatial: ["GEOMETRY", "POINT", "LINESTRING", "POLYGON", "GEOMETRYCOLLECTION", "MULTILINESTRING", "MULTIPOINT", "MULTIPOLYGON"],
	number: ["SMALLINT", "MEDIUMINT", "INT", "BIGINT", "DECIMAL", "FLOAT", "DOUBLE", "BIT"],
	binary: ["BINARY", "VARBINARY"],
	text: ["VARCHAR", "TINYTEXT", "TEXT", "MEDIUMTEXT", "LONGTEXT"],
	file: ["TINYBLOB", "BLOB", "MEDIUMBLOB", "LONGBLOB"],
	list: ["ENUM", "SET"],
	date: ["DATE", "TIME", "DATETIME", "TIMESTAMP", "YEAR"],
	json: ["JSON"],
};
const floatNumberTypes = ["DECIMAL", "FLOAT", "DOUBLE"];
const getGeneralInformation = function(mysqlTypeLower, row, table, results) {
	const mysqlType = mysqlTypeLower.toUpperCase();
	let info = {};
	Object.keys(allTypes).forEach(generalType => {
		const subtypes = allTypes[generalType];
		subtypes.forEach(subtype => {
			if (mysqlType.indexOf(subtype) === 0) {
				info.type = generalType;
				info.subtype = subtype.toLowerCase();
				info.typeTerm = mysqlTypeLower.replace(/(\(| ).*/g, "");
				info.archetype = mysqlTypeLower;
			}
		});
	});
	///////////////////////////////////////
	// 1. On list: get optionsList
	if(info.type === "list") {
		info.optionsList = row.$columnType
			.replace(info.typeTerm, "")
			.replace(/^\('|'\)$/g, "")
			.split(/','/g);
	} else {
		info.optionsList = null;
	}
	///////////////////////////////////////
	// 2. On numbers: get isFloat
	if (info.type === "number") {
		if (floatNumberTypes.indexOf(info.subtype.toUpperCase()) !== -1) {
			info.isFloat = false;
		} else {
			info.isFloat = true;
		}
	} else {
		info.isFloat = null;
	}
	//////////////////////////////////////
	// 3. On numbers: get isUnsigned
	if (info.type === "number") {
		if (row.$isUnsigned === 1) {
			info.isUnsigned = true;
		} else {
			info.isUnsigned = false;
		}
	} else {
		info.isUnsigned = null;
	}
	//////////////////////////////////////
	// 4. On numbers & primary keys: get isAutoIncrement
	if (info.type === "number" && row.$boundConstraint === "PRIMARY") {
		if (row.$isAutoIncrement === 1) {
			info.isAutoIncrement = true;
		} else {
			info.isAutoIncrement = false;
		}
	} else {
		info.isAutoIncrement = null;
	}
	///////////////////////////////////////
	// 5. On texts: get maxTextLength
	if (["text", "binary", "file", "json"].indexOf(info.type) !== -1) {
		info.maxTextLength = row.$maximumCharactersLength;
	} else {
		info.maxTextLength = row.$maximumCharactersLength;
	}
	///////////////////////////////////////
	// 6. On bound constraint: get referencesTo
	const { constraints } = results;
	info.isUnique = row.$boundConstraint === "PRIMARY";
	info.isForeignKey = false;
	info.referencesTo = [];
	for(let index = 0; index < constraints.length; index++) {
		const constraint = constraints[index];
		const isSameTable = constraint.$table === row.$table;
		const isSameColumn = constraint.$column === row.$column;
		if(isSameTable && isSameColumn) {
			if(constraint.$constraintType === "UNIQUE") {
				info.isUnique = true;
			} else if(constraint.$constraintType === "FOREIGN KEY") {
				info.isForeignKey = true;
				info.referencesTo.push({
					id: constraint.$constraintName,
					model: toPascalCase(constraint.$referencedTable),
					table: constraint.$referencedTable,
					column: constraint.$referencedColumn,
					isPrimaryKey: row.$boundConstraint === "PRIMARY",
				});
			}
		}
	}
	///////////////////////////////////////
	// 7. On any: get referencedBy
	const { columns } = results;
	info.referencedBy = [];
	columns.forEach(column => {
		const isSameTable = column.$referencedTable === row.$table;
		const isSameColumn = column.$referencedColumn === row.$column;
		if(isSameTable && isSameColumn) {
			info.referencedBy.push({
				model: toPascalCase(column.$table),
				table: column.$table,
				column: column.$column,
				isPrimaryKey: column.$boundConstraint === "PRIMARY"
			});
		}
	});
	return info;
};
const createColumnObjectSorted = function(unordered) {
	const ordered = {};
	const order = [,
		"order",
		"model",
		"table",
		"column",
		"type",
		"typeTerm",
		"subtype",
		"default",
		"extra",
		"isPrimaryKey",
		"isAutoIncrement",
		"isNullable",
		"isFloat",
		"isUnsigned",
		"isForeignKey",
		"isUnique",
		"referencesTo",
		"referencedBy",
		"optionsList",
		"minTextLength",
		"maxTextLength",
		"database",
		"archetype",
		"schema",
	];
	Object.keys(unordered).sort().sort((a, b) => {
		return order.indexOf(a) > order.indexOf(b) ? 1 : -1;
	}).filter(function(key) {
		return !key.startsWith("$");
	}).forEach(function(key) {
		ordered[key] = unordered[key];
	});
	return ordered;
};
const createTableObjectSorted = function(unordered) {
	const ordered = {};
	Object.keys(unordered).sort((a, b) => {
		return unordered[a].order > unordered[b].order ? 1 : -1;
	}).forEach(function(key) {
		ordered[key] = unordered[key];
	});
	return ordered;
};
module.exports = async function DefaultSort(results, credentials, options, extensions) {
	const schema = {};
	const { columns } = results;
	// @TODO: 
	for (let iRow = 0; iRow < columns.length; iRow++) {
		const row = columns[iRow];
		// 1. Create table if not exists:
		const modelName = toPascalCase(row.$table);
		if (!(modelName in schema)) {
			schema[modelName] = {};
		}
		// 2. Add column:
		const columnName = row.$column;
		if (!(columnName in schema[modelName])) {
			schema[modelName][columnName] = Object.assign({}, {schema: row});
		}
		// 3. Add column attributes:
		schema[modelName][columnName].isNullable = row.$isColumnisNullable === "YES";
		schema[modelName][columnName].default = row.$defaultColumnValue;
		schema[modelName][columnName].extra = row.$extraColumnInformation === "" ? false : row.$extraColumnInformation;
		schema[modelName][columnName].isPrimaryKey = row.$boundConstraint === "PRIMARY";
		schema[modelName][columnName].order = row.$ordinalColumnPosition;
		schema[modelName][columnName].column = columnName;
		schema[modelName][columnName].model = modelName;
		schema[modelName][columnName].table = row.$table;
		schema[modelName][columnName].database = row.$database;
		const typeInfo = getGeneralInformation(row.$columnType, row, schema[modelName], results);
		Object.assign(schema[modelName][columnName], typeInfo);
		schema[modelName][columnName] = createColumnObjectSorted(schema[modelName][columnName]);
		
		if(row.$table in extensions) {
			if(columnName in extensions[row.$table]) {
				Object.assign(schema[modelName][columnName], extensions[row.$table][columnName]);
			}
		}
	}
	Object.keys(schema).forEach(modelName => {
		schema[modelName] = createTableObjectSorted(schema[modelName]);
	});
	return schema;
};