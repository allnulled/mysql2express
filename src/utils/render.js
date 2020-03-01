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

module.exports = async function DefaultRender(data, credentials, options, extensions) {
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
	Object.keys(data.schema).forEach(Model => {
		const modelAttributes = data.schema[Model];
		const parameters = {
			Model,
			modelInfo: data.models[Model],
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