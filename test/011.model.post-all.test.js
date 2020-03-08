const {
    expect
} = require("chai");


describe("Model.postAll({...})", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("can insert simple objects in a bulk", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const user = User.create({ debugSQL: true });
        const store = user.store.create();
        user.postAll([{
            name: "username +1",
            password: "password",
            email: "somemail@domain1.com",
            alias: "useralias",
            phone: "95959595",
            description: "some description"
        }, {
            name: "username +2",
            password: "password",
            email: "somemail@domain2.com",
            alias: "useralias",
            phone: "95959595",
            description: "some description"
        }, {
            name: "username +3",
            password: "password",
            email: "somemail@domain3.com",
            alias: "useralias",
            phone: "95959595",
            description: "some description"
        }], [], [{
            id: {
                contents: "Some text for id ..."
            },
            name: {
                contents: "Some text about the name..."
            },
            password: {
                contents: "Some text about the password"
            }
        }]).then(results => {
            const {
                id
            } = results;
            expect(id).to.equal(1003);
            const asyncOp = async() => {
                try {
                	/*
                    const contentsId = await store.readFile("/user.id." + id + ".txt");
                    expect(contentsId.startsWith("Some text for id ...")).to.equal(true);
                    const contentsName = await store.readFile("/user.name." + id + ".txt");
                    expect(contentsName.startsWith("Some text about the name...")).to.equal(true);
                    const contentsPassword = await store.readFile("/user.password." + id + ".txt");
                    expect(contentsPassword.startsWith("Some text about the password")).to.equal(true);
                    //*/
                    return done();
                } catch (error) {
                    return fail(error);
                }
            };
            asyncOp();
        }).catch(fail);
    });
});