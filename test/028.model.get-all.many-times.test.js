describe("Model.getAll(...) called many times", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

	it.skip("can stand 1000 operations without heaping memory leaks", function(done) {
		this.timeout(Infinity);
		const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");
		const User = require(process.env.PROJECT_ROOT + "/src/models/User.js");
		const user = User.create();
		let results = 0, times = 0;
		const MAX_QUERIES = 1000;
		const MAX_TIMES = 1;
		const accumulateOrNext = () => {
			results++;
			console.log(results);
			if(results === MAX_QUERIES) {
				times++;
				if(times === MAX_TIMES) {
					Logger.printAnalysis();
					return done();
				} else {
					Logger.printAnalysis();
					console.log("Time:         " + times);
					console.log(`Memory usage: ${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`);
					setTimeout(restart, 2000);
				}
			}
		};
		const restart = () => {
			results = 0;
			for(let index=0; index < MAX_QUERIES; index++) {
				user.getAll({
					where: [
						["id", ">", index]
					]
				}).then(accumulateOrNext).catch(fail);
			}
		};
		return restart();
	});

});