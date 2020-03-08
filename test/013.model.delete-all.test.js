const {
    expect
} = require("chai");


describe("Model.deleteAll({...})", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("can delete simple objects in a bulk", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const user = User.create({ debugSQL: true });
        const store = user.store.create();
        user.deleteAll([500,501,502,503,504]).then(results => {
            const {
                id,
                affectedRows
            } = results;
            expect(affectedRows).to.equal(5);
            done();
        }).catch(fail);
    });
});