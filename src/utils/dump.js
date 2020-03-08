const path = require("path");
const ejs = require("ejs");
const fs = require("fs-extra");

module.exports = function(output, schema, credentials, options) {
	const settings = {};
	return new Promise((ok, fail) => {
		///////////////////////////////////
		// 0. Prepare parameters:
		///////////////////////////////////
		const usage = {};
		const database = credentials.database;
		let {outputPath = false, exportLive = false} = options;
		if(!outputPath) {
			outputPath = path.resolve(process.cwd(), "mysql2express-" + database);
		}
		///////////////////////////////////
		// 1. Dump database schema:
		///////////////////////////////////
		try {
			const pathToSchema = path.resolve(outputPath, `src/schema.json`);
			fs.outputFileSync(pathToSchema, JSON.stringify(schema, null, 4), "utf8");
		} catch (error) {
			return fail(error);
		}
		///////////////////////////////////
		// 3. Output all files:
		///////////////////////////////////
		Object.keys(output).forEach(file => {
			const fullPath = path.resolve(outputPath, file);
			const contents = output[file];
			try {
				fs.outputFileSync(fullPath, contents, "utf8");
			} catch (error) {
				return fail(error);
			}
		});
		///////////////////////////////////
		// 4. Return demanded data:
		///////////////////////////////////
		if(exportLive) {
			return ok(usage);
		} else {
			return ok(output);
		}
	});
}