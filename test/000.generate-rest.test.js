const config = require(__dirname + "/test.conf.js");
const fs = require("fs");
const rimraf = require("rimraf");
const exec = require("execute-command-sync");
const {
    expect
} = require("chai");
const mysql2express = require(__dirname + "/../src/index.js");
const credentials = config.credentials;
const options = config.options;
const extensions = config.extensions;

console.log(`${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`);
//process.exit(0);

describe("mysql2express(...)", function() {

    before(function() {
        rimraf.sync(__dirname + "/rest-1/src");
        rimraf.sync(__dirname + "/rest-1/src/models/base");
        rimraf.sync(__dirname + "/rest-1/src/controllers/base");
        rimraf.sync(__dirname + "/rest-2");
    });

    it("can generate a REST API from mysql2express API", function(done) {
        this.timeout(10 * 1000);
        mysql2express(credentials, options, extensions)
            .then(sources => {
                expect(fs.existsSync(__dirname + "/rest-1/src/getConnection.js")).to.equal(true);
                expect(fs.existsSync(__dirname + "/rest-1/src/schema.json")).to.equal(true);
                expect(fs.existsSync(__dirname + "/rest-1/src/controllers")).to.equal(true);
                expect(fs.existsSync(__dirname + "/rest-1/src/models")).to.equal(true);
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
        const command = "./bin/mysql2express " + credentialsCommand + " --output \"./test/rest-2\"";
        console.log("[cmd] " + command);
        exec(command, {
            cwd: __dirname + "/.."
        });
        expect(fs.existsSync(__dirname + "/rest-2/src/getConnection.js")).to.equal(true);
        expect(fs.existsSync(__dirname + "/rest-2/src/schema.json")).to.equal(true);
        expect(fs.existsSync(__dirname + "/rest-2/src/controllers")).to.equal(true);
        expect(fs.existsSync(__dirname + "/rest-2/src/models")).to.equal(true);
        return done();
    });

    it("can absorv environment variables from tested project", function(done) {
        require("dotenv").config({ path: __dirname + "/rest-1/.env.test" });
        return done();
    })

});