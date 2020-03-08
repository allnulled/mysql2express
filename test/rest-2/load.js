const config = require(__dirname + "/m2e.config.js");
const runnerId = config.runner || "Runner";
const Runner = require(__dirname + "/src/runners/" + runnerId + ".js");
const runner = Runner.create(config);
module.exports = runner.onLoad();