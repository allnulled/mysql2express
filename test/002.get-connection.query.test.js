const fs = require("fs");
const { expect } = require("chai");
const SQLScript = require("fs").readFileSync(__dirname + "/002.get-connection.query.test.sql").toString();

describe("connection.query(...)", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can execute an SQL script", function(done) {
		this.timeout(10 * 1000);
		const getConnection = require(__dirname + "/rest-1/getConnection.js");
		getConnection().then(connection => {
			connection.query(SQLScript).then(result => {
				return done();
			}).catch(fail);
		}).catch(fail);
	});
	
});