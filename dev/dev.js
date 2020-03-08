const chokidar = require("chokidar");
const { spawn } = require("child_process");
let cp = undefined;

chokidar.watch([
	__dirname + "/../src/**/*.js",
	__dirname + "/../test/**/*.test.js"
]).on("change", function() {
	try {
		console.log("Killing tests...");
		if("kill" in cp) cp.kill();
	} catch(error) {}
	try {
		console.log("Re-running tests...");
		cp = spawn("npm", ["run", "test"], {
			cwd: __dirname + "/..",
			stdio: "inherit"
		});
		cp.on("finish", cp.kill);
	} catch(error) {
		cp.on("finish", cp.kill);
	}
});