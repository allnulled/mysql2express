const fs = require("fs");
const rimraf = require("rimraf");
const { expect } = require("chai");

describe("connection.end()", function() {

	it("can close connection", function(done) {
		this.timeout(10 * 1000);
		const getConnection = require(__dirname + "/rest-1/getConnection.js");
		getConnection().then(connection => {
			connection.end().then(() => {
				done();
			}).catch(error => {
				console.log(error);
				expect(true).to.equal(false);	
			});
		}).catch(error => {
			console.log(error);
			expect(true).to.equal(false);
		});
	});

});