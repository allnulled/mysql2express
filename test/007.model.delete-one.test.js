const { expect } = require("chai");

describe("Model.deleteOne({...})", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can delete objects by id", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		const user = User.create();
		user.deleteOne(1001).then(results => {
			const { affectedRows } = results;
			expect(affectedRows).to.equal(1);
			user.getOne(1001).then(results => {
				const { data } = results;
				expect(data).to.equal(null);
				done();
			}).catch(fail);
		}).catch(fail);
	});

});