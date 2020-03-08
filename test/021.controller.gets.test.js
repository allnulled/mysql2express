const http = require("http");
const express = require("express");
const request = require("request");
const {
    expect
} = require("chai");


describe("Model controller + GET all + GET one + GET file", function() {

    this.timeout(10 * 1000);

    const PORT = 9099;
    let server;

    const fail = (error) => {
        console.log("Showing error from test:", error);
        if (server && server.close) server.close();
        expect(true).to.equal(false);
    };

    it("can be exposed by an express application", function(doneTest) {
        const UserCtlr = require(__dirname + "/rest-1/src/controllers/UserController.js");
        const userCtlr = UserCtlr.create({
            debugSQL: true
        });
        userCtlr.mountOn().then(app => {
            app.get("/", (req, res) => res.send("OK!!!"));
            server = app.listen(PORT, () => {
                let indexRequest = 0;
                const getDone = () => {
                    indexRequest++;
                    if (indexRequest >= 3) {
                        server.close();
                        return doneTest();
                    }
                }
                // GET all:
                request(`http://127.0.0.1:${PORT}/user`, (error, response, body) => {
                    if (error) {
                        console.log("Error", error);
                        throw error;
                    }
                    //expect(body).to.equal("get all!");
                    return getDone();
                });
                // GET one:
                request(`http://127.0.0.1:${PORT}/user/1`, (error, response, body) => {
                    if (error) {
                        console.log("Error", error);
                        throw error;
                    }
                    expect(body).to.equal("get one!");
                    return getDone();
                });
                // GET schema:
                request(`http://127.0.0.1:${PORT}/user/@schema`, (error, response, body) => {
                    if (error) {
                        throw error;
                    }
                    try {
                        const data = JSON.parse(body);
                        expect(Object.keys(data)).to.deep.equal(["table","attributes"]);
                    } catch(error) {
                        console.log(error);
                    }
                    return getDone();
                });
            });
        }).catch(fail);
    });


});