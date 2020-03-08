const express = require("express");
const fs = require("fs");
const pkg = require(process.env.PROJECT_ROOT + "/package.json");
const {
	toIterator,
	findIn
} = require(process.env.PROJECT_ROOT + "/src/utils.js");

class RestControllerBase {

	static create(...args) {
		return new this(...args);
	}

	static get DEFAULT_OPTIONS() {
		return {};
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}

	mountOn(options = {}) {
		return new Promise((ok, fail) => {
			toIterator({
				scope: this,
				lifecycle: [
					"onValidateMount",
					"onExecuteMount"
				],
				options,
				ok,
				fail,
				...Object.assign({}, options, this)
			}).next();
		});
	}
	
	onValidateMount(parameters) {
		parameters.endpoint = "/api/v" + pkg.version.split(".")[0];
	}

	onExecuteMount(parameters) {

	}

}

module.exports = RestControllerBase;