const { expect } = require("chai");


describe("Model.postOne({...})", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can insert simple objects", function(done) {
		const User = require(__dirname + "/rest-1/models/UserModel.js");
		const user = User.create();
		const store = user.store.create();
		store.init().then(() => {
			user.postOne({
				name: "username",
				password: "password",
				email: "somemail@domain.com",
				alias: "useralias",
				phone: "95959595",
				description: "some description"
			}, [], {
				id: {
					contents: "Some text for id ..."
				},
				name: {
					contents: "Some text about the name..."
				},
				password: {
					contents: "Some text about the password"
				}
			}).then(results => {
				const { id } = results;
				expect(id).to.equal(1001);
				const asyncOp = async () => {
					try {
						const contentsId = await store.readFile("/user.id." + id + ".txt");
						expect(contentsId.startsWith("Some text for id ...")).to.equal(true);
						const contentsName = await store.readFile("/user.name." + id + ".txt");
						expect(contentsName.startsWith("Some text about the name...")).to.equal(true);
						const contentsPassword = await store.readFile("/user.password." + id + ".txt");
						expect(contentsPassword.startsWith("Some text about the password")).to.equal(true);
						return done();
					} catch(error) {
						return fail(error);
					}
				};
				asyncOp();
			}).catch(fail);
		}).catch(error => {
			fail(error);
			process.exit(0);
		});
	});

});