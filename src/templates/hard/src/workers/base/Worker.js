const { toIterator } = require(__dirname + "/../../utils.js");
const Logger = require(__dirname + "/../../loggers/Logger.js")

Logger.startsClass("src/workers/Worker");

class Worker {

	static get DEFAULT_OPTIONS() {
		return {};
	}

	static create(...args) {
		return new this(...args);
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}

	start(options = {}) {
		return new Promise((ok, fail) => {
			toIterator(Object.assign({}, options, {
				scope: this,
				lifecycle: ["onStart", "onWork", "onDone"],
				ok,
				fail,
				isRunning: true
			})).next();
		});
	}

	onStart(options = {}) {
		Logger.startsMethod("src/workers/Worker@onStart");
		Logger.endsMethod("src/workers/Worker@onStart");
	}

	onWork(options = {}) {
		Logger.startsMethod("src/workers/Worker@onWork");
		Logger.endsMethod("src/workers/Worker@onWork");
	}

	onDone(options = {}) {
		Logger.startsMethod("src/workers/Worker@onDone");
		Logger.endsMethod("src/workers/Worker@onDone");
	}

}

Logger.endsClass("src/workers/Worker");

module.exports = Worker;