const Querier = require(__dirname + "/utils/query.js");
const Sorter = require(__dirname + "/utils/sort.js");
const Renderer = require(__dirname + "/utils/render.js");
const Dumper = require(__dirname + "/utils/dump.js");
const DEFAULT_OPTIONS = {
	outputDirectory: process.cwd()
};

module.exports = async function QuerySortRender(credentials, options = DEFAULT_OPTIONS, extensions = {}) {
	try {
		if(typeof credentials !== "object") {
			return fail(new Error("First parameter must be an object (with the mysql connection credentials)"));
		}
		if(typeof credentials.database !== "string") {
			return fail(new Error("First parameter must provide <database> property as a string"));
		}
		if(typeof credentials.user !== "string") {
			return fail(new Error("First parameter must provide <user> property as a string"));
		}
		if(typeof options !== "object") {
			return fail(new Error("Third parameter must be an object (with the general options)"));
		}
		const results = await Querier(credentials, options);
		const data = await Sorter(results, credentials, options, extensions);
		const output = await Renderer(data, credentials, options);
		const files = await Dumper(output, data, credentials, options);
		return files;
	} catch(error) {
		console.log("[mysql2express] ERRORS ARISED IN DATABASE SCHEMA SOURCES GENERATION.")
		console.log("[mysql2express] PLEASE, CHECK THE FOLLOWING ERROR:")
		console.log(error);
	}
}