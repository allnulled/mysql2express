const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const { toCamelCase, toPascalCase, findIn } = require(__dirname + "/utils.js");
const globby = require("globby");
const allSoftTemplates = globby.sync(__dirname + "/../templates/soft/**/*", {dot:true});
const allHardTemplates = globby.sync(__dirname + "/../templates/hard/**/*", {dot:true});
const readFile = function(p) {
	return fs.readFileSync(path.resolve(p)).toString();
};
const srcTableModel = readFile(__dirname + "/../templates/TableModel.ejs");
const srcTableModelBase = readFile(__dirname + "/../templates/TableModelBase.ejs");
const srcTableController = readFile(__dirname + "/../templates/TableController.ejs");
const srcTableControllerBase = readFile(__dirname + "/../templates/TableControllerBase.ejs");

module.exports = async function DefaultRender(data, credentials, options, extensions) {
	const ejsParameters = {
		require,
		process,
		credentials: credentials,
		database: credentials.database,
		options,
		toCamelCase,
		toPascalCase,
		findIn,
		data,
		extensions,
	};
	const getFullPath = (subpath) => {
		return path.resolve(options.outputPath, subpath);
	}
	const output = {};
	Object.keys(data.schema).forEach(Model => {
		const modelAttributes = data.schema[Model];
		const parameters = {
			Model,
			modelInfo: data.models[Model],
			modelAttributes,
			...ejsParameters
		};
		output[`src/models/base/${Model}.js`] = ejs.render(srcTableModelBase, parameters);
		if(!fs.existsSync(getFullPath(`src/models/${Model}.js`))) {
			output[`src/models/${Model}.js`] = ejs.render(srcTableModel, parameters);
		}
		output[`src/controllers/base/${Model}Controller.js`] = ejs.render(srcTableControllerBase, parameters);
		if(!fs.existsSync(getFullPath(`src/controllers/${Model}Controller.js`))) {
			output[`src/controllers/${Model}Controller.js`] = ejs.render(srcTableController, parameters);
		}
	});
	const pathToSoftTemplates = path.resolve(__dirname + "/../templates/soft");
	allSoftTemplates.forEach(softTemplate => {
		const pathToSoftTemplate = path.resolve(softTemplate);
		const pathToSoft = pathToSoftTemplate.replace(pathToSoftTemplates, "").replace(/^\/+/g, "");
		if(!fs.existsSync(getFullPath(pathToSoft))) {
			const srcTemplate = fs.readFileSync(pathToSoftTemplate).toString();
			output[pathToSoft] = ejs.render(srcTemplate, ejsParameters);
		}
	});
	const pathToHardTemplates = path.resolve(__dirname + "/../templates/hard");
	allHardTemplates.forEach(hardTemplate => {
		const pathToHardTemplate = path.resolve(hardTemplate);
		const pathToHard = pathToHardTemplate.replace(pathToHardTemplates, "").replace(/^\/+/g, "");
		const srcTemplate = fs.readFileSync(pathToHardTemplate).toString();
		output[pathToHard] = ejs.render(srcTemplate, ejsParameters);
	});
	return output;
}