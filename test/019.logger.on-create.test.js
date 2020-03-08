const {
    expect
} = require("chai");

describe("Logger class", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("can add classes, instances, methods, static methods and functions", function(done) {
        const { Logger } = require(__dirname + "/rest-1/load.js");
        expect(typeof Logger.startsClass).to.equal("function");
        expect(typeof Logger.startsInstance).to.equal("function");
        expect(typeof Logger.startsMethod).to.equal("function");
        expect(typeof Logger.startsStaticMethod).to.equal("function");
        expect(typeof Logger.startsFunction).to.equal("function");
        expect(typeof Logger.endsFunction).to.equal("function");
        expect(typeof Logger.debug).to.equal("function");
        done();
    });

});