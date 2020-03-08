const {
    expect
} = require("chai");

describe("Runner class", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("can onLoad", function(done) {
        const RunnerClass = require(__dirname + "/rest-1/src/runners/Runner.js");
        const {
            Runner,
            Logger,
            Server
        } = RunnerClass.create().onLoad();
        expect(RunnerClass).to.equal(Runner);
        expect(typeof Runner).to.equal("function");
        expect(typeof Logger).to.equal("object");
        expect(typeof Server).to.equal("function");
        return done();
    });

});