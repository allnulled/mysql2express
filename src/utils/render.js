const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { toCamelCase, toPascalCase } = require(__dirname + "/utils.js");
const tableModelFile = path.resolve(__dirname + "/../templates/TableModel.ejs");
const tableControllerFile = path.resolve(__dirname + "/../templates/TableController.ejs");
const modelFile = path.resolve(__dirname + "/../templates/Model.ejs");
const controllerFile = path.resolve(__dirname + "/../templates/Controller.ejs");
const storeFile = path.resolve(__dirname + "/../templates/Store.ejs");
const srcParentModel = fs.readFileSync(modelFile).toString();
const srcParentController = fs.readFileSync(controllerFile).toString();
const srcTableModel = fs.readFileSync(tableModelFile).toString();
const srcTableController = fs.readFileSync(tableControllerFile).toString();
const srcParentStore = fs.readFileSync(storeFile).toString();

module.exports = async function DefaultRender(data, credentials, options) {
	const ejsParameters = {
		require,
		process,
		credentials: credentials,
		database: credentials.database,
		options
	};
	const output = {
		"models/Model.js": ejs.render(srcParentModel, ejsParameters),
		"controllers/Controller.js": ejs.render(srcParentController, ejsParameters),
		"stores/Store.js": ejs.render(srcParentStore, ejsParameters),
	};
	Object.keys(data).forEach(Model => {
		const modelAttributes = data[Model];
		const modelInfo = (() => {
			const attributes = Object.keys(modelAttributes);
			const column = modelAttributes[attributes[0]];
			const database = column.database;
			const table = column.table;
			const primaryKeys = (() => {
				const pks = [];
				attributes.forEach(attributeName => {
					const attribute = modelAttributes[attributeName];
					if(attribute.isPrimaryKey) {
						pks.push(attributeName);
					}
				});
				return pks;
			})();
			const foreignKeys = (() => {
				const fks = [];
				attributes.forEach(attributeName => {
					const attribute = modelAttributes[attributeName];
					if(attribute.isForeignKey) {
						attribute.referencesTo.forEach(referencesTo => {
							const { table, column, id } = referencesTo;
							fks.push({
								constraint: id,
								column: attributeName,
								referencedTable: table,
								referencedColumn: column
							});
						});
					}
				});
				return fks;
			})();
			return { database, model: Model, table, attributes, primaryKeys, foreignKeys };
		})();
		const parameters = {
			Model,
			modelInfo,
			modelAttributes,
			...ejsParameters
		};
		const srcModel = ejs.render(srcTableModel, parameters);
		const srcController = ejs.render(srcTableController, parameters);
		output[`models/${Model}Model.js`] = srcModel;
		output[`controllers/${Model}Controller.js`] = srcController;
	});
	return output;
}