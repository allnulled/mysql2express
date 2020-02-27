const { expect } = require("chai");

describe("Model.getOne({...})", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can get by id + selecting fields", function(done) {
		const User = require(__dirname + "/rest-1/models/UserModel.js");
		User.create().getOne(5, ["name"]).then(results => {
			const { data, structure } = results;
			expect(typeof data).to.equal("object");
			expect(Object.keys(data)).to.deep.equal(["name"]);
			expect(data.name).to.equal("bgvjhxzgzy0ufm7jeqbbl7pvowzmcvol");
			done();
		}).catch(fail);
	});

});