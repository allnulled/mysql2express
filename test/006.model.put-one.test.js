const { expect } = require("chai");

describe("Model.putOne({...})", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can update objects by id", function(done) {
		const User = require(__dirname + "/rest-1/models/UserModel.js");
		const user = User.create();
		user.putOne(1001, {
			name: "username2",
		}).then(results => {
			const { changedItems } = results;
			expect(changedItems).to.equal(1);
			user.getOne(1001).then(results => {
				const { data } = results;
				expect(data).to.not.equal(null);
				expect(data.name).to.equal("username2");
				done();
			});
		}).catch(fail);
	});

});