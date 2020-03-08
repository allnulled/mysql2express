const http = require("http");
const express = require("express");
const request = require("request");
const {
    expect
} = require("chai");


describe("Model controller + POST all + POST one + POST file", function() {

    this.timeout(10 * 1000);

    const PORT = 9098;
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
                const formData1 = {};
                const formData2 = {};
                const formData3 = {};
                // POST all:
                request.post({
                    url:`http://127.0.0.1:${PORT}/user`,
                    formData: formData1
                }, (error, response, body) => {
                    if (error) {
                        console.log("Error", error);
                        throw error;
                    }
                    console.log(body);
                    return getDone();
                });
                // POST one:
                request.post({
                    url:`http://127.0.0.1:${PORT}/user/1`,
                    formData: formData2
                }, (error, response, body) => {
                    if (error) {
                        console.log("Error", error);
                        throw error;
                    }
                    console.log(body);
                    return getDone();
                });
                // POST schema:
                request.post({
                    url:`http://127.0.0.1:${PORT}/user/@schema`,
                    formData: formData3
                }, (error, response, body) => {
                    if (error) {
                        throw error;
                    }
                    console.log(body);
                    return getDone();
                });
            });
        }).catch(fail);
    });


});