const http = require("http");
const { toIterator } = require(__dirname + "/../../utils.js");

class Server {

	static create(...args) {
		return new this(...args);
	}

	static get DEFAULT_OPTIONS() {
		return {
			app: undefined,
			port: 9607,
			securePort: 9608,
		};
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}

	start() {
		return new Promise((ok, fail) => {
			const lifecycle = this.getLifecycleToStart();
			const parameters = Object.assign({}, {
				scope: this,
				lifecycle,
				ok,
				fail,
			});
			setImmediate(toIterator(parameters).next);
		});
	}

	getLifecycleToStart() {
		return ["onCreateServer", "onListen", "onEnd"];
	}
	
	onCreateServer(parameters) {
		this.server = http.createServer(this.app);
		this.secureServer = undefined; //http.createServer(this.app);
	}

	onListen(parameters) {
		return new Promise((ok, fail) => {
			const { server } = this;
			server.listen(this.port, (err) => {
				if(err) return fail(err);
				console.log("Started listening.");
				return ok();
			});
		});
	}

	onEnd(parameters) {
		console.log("Enjoy m2e! Enjoy time!");
	}


}

module.exports = Server;