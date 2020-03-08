const {
    expect
} = require("chai");

describe("Runner class", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("can onStart", function(done) {
        const RunnerClass = require(__dirname + "/rest-1/src/runners/Runner.js");
        const runnerInstance = RunnerClass.create();
        runnerInstance.onStart().then(params => {
            const {
                context,
                runner
            } = params;
            const {
                Runner,
                Logger,
                Server
            } = context.modules;
            expect(RunnerClass).to.equal(Runner);
            expect(runnerInstance).to.equal(runner);
            expect(typeof Runner).to.equal("function");
            expect(typeof Logger).to.equal("object");
            expect(typeof Server).to.equal("function");
            context.server.close();
            return done();
        }).catch(fail);
    });

});