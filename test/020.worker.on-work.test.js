const { expect } = require("chai");

describe("Worker class", function() {

	it("can start working", function(done) {
		const { Worker, Logger } = require(__dirname + "/rest-1/load.js");
		let i = 0;
		const worker = Worker.create({
			onWork(options) {
				i = options.value;
			},
			onDone(options) {
				expect(i).to.equal(5);
				done();
			}
		});
		worker.start({ value: 5 });
	});

});