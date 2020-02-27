const fs = require("fs");
const rimraf = require("rimraf");
const { expect } = require("chai");

describe("remove generated REST files", function() {

	after(function() {
		// rimraf.sync(__dirname + "/rest-1");
	});

	it("remove tested REST API", function(done) {
		this.timeout(10 * 1000);
		expect(fs.existsSync(__dirname + "/rest-1/getConnection.js")).to.equal(true);
		expect(fs.existsSync(__dirname + "/rest-1/schema.json")).to.equal(true);
		expect(fs.existsSync(__dirname + "/rest-1/controllers")).to.equal(true);
		expect(fs.existsSync(__dirname + "/rest-1/models")).to.equal(true);
		return done();
	});

});