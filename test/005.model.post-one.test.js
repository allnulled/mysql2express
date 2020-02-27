const { expect } = require("chai");

describe("Model.postOne({...})", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can insert simple objects", function(done) {
		const User = require(__dirname + "/rest-1/models/UserModel.js");
		User.create().postOne({
			name: "username",
			password: "password",
			email: "somemail@domain.com",
			alias: "useralias",
			phone: "95959595",
			description: "some description"
		}).then(results => {
			const { id } = results;
			expect(id).to.equal(1001);
			done();
		}).catch(fail);
	});

});