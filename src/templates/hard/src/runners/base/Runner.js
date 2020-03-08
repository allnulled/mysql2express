const path = require("path");
const http = require("http");
const express = require("express");
const { toIterator, findInAny } = require(`${__dirname}/../../utils.js`);
const DEFAULT_PORT = 9909;

class Runner {

	static get DEFAULT_OPTIONS() {
		return {
			settings: {
				server: {
					port: DEFAULT_PORT
				}
			},
			toLoad: {
				Auth: "/src/auths/Auth.js",
				Logger: "/src/loggers/Logger.js",
				Server: "/src/servers/Server.js",
				Runner: "/src/runners/Runner.js",
				Store: "/src/stores/Store.js",
				Worker: "/src/workers/Worker.js",
				utils: "/src/utils.js",
				getConnection: "/src/getConnection.js",
			}
		};
	}

	static create(...args) {
		return new this(...args);
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}

	onLoadEnvironment(context = {}) {
		if(!process.env.NODE_ENV) {
			process.env.NODE_ENV = "development";
		}
		require("dotenv").config({ path: `${__dirname}/../../../.env.${process.env.NODE_ENV}`});
		process.env.PROJECT_ROOT = path.resolve(`${__dirname}/../../..`);
	}

	onLoadModules(context = {}) {
		const toLoad = findInAny([context, this], ["toLoad"]);
		return Object.keys(toLoad).reduce((out, moduleName) => {
			try {
				const moduleSubpath = toLoad[moduleName];
				const modulePath = path.resolve(__dirname + "/../../..", moduleSubpath.replace(/^\//g,""));
				const moduleContents = require(modulePath);
				out[moduleName] = moduleContents;
				return out;
			} catch(error) {
				console.log(`Error loading module ${moduleName}. Details:`, error);
				return out;
			}
		}, { runner: this });
		
	}

	onLoad(context = {}) {
		this.onLoadEnvironment(context);
		return this.onLoadModules(context);
	}

	onStart(context = {}) {
		context.modules = this.onLoad(context);
		return new Promise((ok, fail) => {
			toIterator(Object.assign({}, context, {
				scope: this,
				lifecycle: [
					"onCreateApp",
					"onCreateServer",
					"onComposeServer",
					"onComposeApp",
					"onStartWorker",
					"onServe"
				],
				ok,
				fail,
			})).next();
		});
	}

	onCreateApp(context = {}) {
		context.app = findInAny([context, this], ["app"], undefined);
		if(typeof context.app === "undefined") {
			context.app = express();
		}
	}

	onCreateServer(context = {}) {
		context.server = http.createServer(context.app);
	}

	onComposeServer(context = {}) {
		
	}

	onComposeApp(context = {}) {
		context.app.get("/", (req, res) => res.send("ok!"));
	}

	onStartWorker(context = {}) {
		const { Worker } = context.modules;
		context.worker = Worker.create();
		context.worker.start();
		return;
	}

	onServe(context = {}) {
		const port = findInAny([context, this], ["settings","server","port"], DEFAULT_PORT);
		return new Promise((ok) => {
			context.output = { context, runner: this };
			context.server.listen(port, ok);
		});
	}


}

module.exports = Runner;