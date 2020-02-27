const config = require(__dirname + "/test.conf.js");
const fs = require("fs");
const rimraf = require("rimraf");
const exec = require("execute-command-sync");
const {
    expect
} = require("chai");
const m2e = require(__dirname + "/../src/index.js");
const credentials = config.credentials;
const options = config.options;

describe("mysql2express(...)", function() {

    before(function() {
        rimraf.sync(__dirname + "/rest-1");
        rimraf.sync(__dirname + "/rest-2");
    });

    it("can generate a REST API from mysql2express API", function(done) {
        this.timeout(10 * 1000);
        m2e(credentials, options, {
                "user": {
                    "id": {
                        "description": "This is an extra, injected information field."
                    }
                }
            })
            .then(sources => {
                expect(fs.existsSync(__dirname + "/rest-1/getConnection.js")).to.equal(true);
                expect(fs.existsSync(__dirname + "/rest-1/schema.json")).to.equal(true);
                expect(fs.existsSync(__dirname + "/rest-1/controllers")).to.equal(true);
                expect(fs.existsSync(__dirname + "/rest-1/models")).to.equal(true);
                return done();
            })
            .catch(error => {
                console.log(error);
                expect(true).to.equal(false);
            });
    });

    it("can generate a REST API from mysql2express CLI", function(done) {
        this.timeout(10 * 1000);
        const credentialsCommand = Object.keys(credentials).map(prop => {
        	return "--" + prop + " \"" + credentials[prop] + "\"";
        }).join(" ");
        const command = "./bin/m2e " + credentialsCommand + " --output \"./test/rest-2\"";
        console.log("[cmd] " + command);
        exec(command, {
        	cwd: __dirname + "/.."
        });
        expect(fs.existsSync(__dirname + "/rest-2/getConnection.js")).to.equal(true);
        expect(fs.existsSync(__dirname + "/rest-2/schema.json")).to.equal(true);
        expect(fs.existsSync(__dirname + "/rest-2/controllers")).to.equal(true);
        expect(fs.existsSync(__dirname + "/rest-2/models")).to.equal(true);
        return done();
    });

});