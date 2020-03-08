const fs = require("fs");
const rimraf = require("rimraf");
const { expect } = require("chai");

describe("Finish tests", function() {

	after(function() {
		// rimraf.sync(__dirname + "/rest-1/src");
	});

	it("removed files", function(done) {
		this.timeout(10 * 1000);
		expect(fs.existsSync(__dirname + "/rest-1/src/getConnection.js")).to.equal(true);
		expect(fs.existsSync(__dirname + "/rest-1/src/schema.json")).to.equal(true);
		expect(fs.existsSync(__dirname + "/rest-1/src/controllers")).to.equal(true);
		expect(fs.existsSync(__dirname + "/rest-1/src/models")).to.equal(true);
		return done();
	});

});