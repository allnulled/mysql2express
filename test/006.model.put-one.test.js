const { expect } = require("chai");

describe("Model.putOne({...})", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can update objects by id", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		const user = User.create();
		const store = user.store.create();
		store.init().then(() => {
			user.putOne(1001, {
				name: "username2",
			}, [], {
				id: {
					contents: "ok"
				},
				name: {
					contents: "Oookokok"
				},
				password: {
					contents: "Reok!"
				}
			}).then(results => {
				const { id, changedItems } = results;
				expect(changedItems).to.equal(1);
				user.getOne(1001).then(results => {
					const { data } = results;
					expect(data).to.not.equal(null);
					expect(data.name).to.equal("username2");
					const asyncOp = async () => {
						try {
							const contentsId = await store.readFile("/user.id." + id + ".txt");
							expect(contentsId.startsWith("ok")).to.equal(true);
							const contentsName = await store.readFile("/user.name." + id + ".txt");
							expect(contentsName.startsWith("Oookokok")).to.equal(true);
							const contentsPassword = await store.readFile("/user.password." + id + ".txt");
							expect(contentsPassword.startsWith("Reok!")).to.equal(true);
							return done();
						} catch(error) {
							return fail(error);
						}
					};
					asyncOp();
				});
			}).catch(fail);
		}).catch(fail);
	});

});