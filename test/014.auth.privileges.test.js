const {
    expect
} = require("chai");


describe("Auth.hasPrivilege(...)", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("can find privileges by name", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const user = User.create({ debugSQL: true });
        user.auth.authenticate({
            user: "bgvjhxzgzy0ufm7jeqbbl7pvowzmcvol",
            password: "p2nighdi6czy5cmreyo9tipl00byd1kea7xz74i7nvc1k5q9x9etu7fl022d1g0p"
        }).then((data) => {
            //console.log(data);
            expect(data.user.name).to.equal("bgvjhxzgzy0ufm7jeqbbl7pvowzmcvol");
            expect(data.communities.length).to.not.equal(0);
            expect(data.privileges.length).to.not.equal(0);
            // @TODO:
            const hasP1 = user.auth.hasPrivilegeByName("bw6hwhymrtbcoupjqpzydqed6etldoj2");
            expect(!!hasP1).to.equal(true);
            done();
        }).catch(fail);
    });

    it("can find privileges by id", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const user = User.create({ debugSQL: true });
        user.auth.authenticate({
            user: "bgvjhxzgzy0ufm7jeqbbl7pvowzmcvol",
            password: "p2nighdi6czy5cmreyo9tipl00byd1kea7xz74i7nvc1k5q9x9etu7fl022d1g0p"
        }).then((data) => {
            //console.log(data);
            expect(data.user.name).to.equal("bgvjhxzgzy0ufm7jeqbbl7pvowzmcvol");
            expect(data.communities.length).to.not.equal(0);
            expect(data.privileges.length).to.not.equal(0);
            // @TODO:
            const hasP1 = user.auth.hasPrivilegeById(9);
            expect(!!hasP1).to.equal(true);
            done();
        }).catch(fail);
    });

});