const {
    expect
} = require("chai");
const path = require("path");

describe("Auth class", function() {
    this.timeout(5000);

    const fail = error => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    }

    let Auth, auth;

    before(function() {
        Auth = require(__dirname + "/rest-1/src/auths/Auth.js");
        auth = Auth.create({ debugSQL: true });
    })

    it("can auth.authenticate(...) to retrieve info", function(done) {
        auth.authenticate({
            user: "cddnf04skneh3fcgov4ztpnk3411seo3",
            password: "mx2lfddmdh8scw2fe3bpl7zik0hnnyxn49l833ty7i0j9x7boevumg10nuicyldv"
        }).then(data => {
            return done();
            done();
        }).catch(error => {
            throw error;
        });
    });

    it("can auth.reauthenticate(...) to refresh info", function(done) {
        auth.reauthenticate({
            user: "ok",
            password: "okok"
        }).then(data => {
            expect(true).to.equal(false);
        }).catch(error => {
            expect(error.message).to.equal("UserNotFoundError");
            done();
        });
    });

});