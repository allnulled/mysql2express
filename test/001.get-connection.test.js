const fs = require("fs");
const rimraf = require("rimraf");
const { expect } = require("chai");

describe("getConnection()", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can get a mysql2 connection", function(done) {
		this.timeout(10 * 1000);
		const getConnection = require(__dirname + "/rest-1/getConnection.js");
		getConnection().then(connection => {
			expect(typeof connection === "object").to.equal(true);
			return done();
		}).catch(fail);
	});
	
});