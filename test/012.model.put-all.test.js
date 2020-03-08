const {
    expect
} = require("chai");


describe("Model.putAll({...})", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("can update simple objects in a bulk", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const user = User.create({ debugSQL: true });
        const store = user.store.create();
        user.putAll([500,501,502,503,504], {
            description: "no description yet."
        }).then(results => {
            const {
                id,
                affectedRows
            } = results;
            expect(affectedRows).to.equal(5);
            user.getAll({ where: [["id", "in", [500,501,502,503,504]]] }).then(results => {
                const { data: data1 } = results;
                user.getAll({ where: [["description", "=", "no description yet."]], fields: [], sort: ["id", "asc"]}).then(results2 => {
                    const { data: data2 } = results2;
                    expect(data1).to.deep.equal(data2);
                    return done();
                }).catch(fail);
            }).catch(fail);
        }).catch(fail);
    });
});