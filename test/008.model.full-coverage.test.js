const {
    expect
} = require("chai");

describe("Model full coverage", function() {

    const fail = (error) => {
        console.log("Showing error from test:", error);
        expect(true).to.equal(false);
    };

    it("throws on Model.MODEL_INFO", function(done) {
        const Model = require(__dirname + "/rest-1/src/models/base/Model.js");
        try {
            const opt = Model.MODEL_INFO;
            expect(true).to.equal(false);
        } catch (error) {
            return done();
        }
    });

    it("throws on Model.MODEL_ATTRIBUTES", function(done) {
        const Model = require(__dirname + "/rest-1/src/models/base/Model.js");
        try {
            const opt = Model.MODEL_ATTRIBUTES;
            expect(true).to.equal(false);
        } catch (error) {
            return done();
        }
    });

    it("can get schema", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const schema = User.create().schema();
        const schema2 = User.MODEL_ATTRIBUTES;
        //
        expect(typeof schema).to.deep.equal("object");
        done();
    });

    it("throws on Model.getOne(...)", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getOne("aaa", ["zzz"]).then(fail).catch(error => {
            expect(error.message).to.equal("Unknown column 'zzz' in 'field list'");
            done();
        });
    });

    it("throws on Model.getAll(...)", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getAll({
            page: "90"
        }).then(fail).catch(error => {
            expect(error.message).to.equal("Invalid <page> value: <string> must be a number or undefined.");
            done();
        });
    });

    it("throws on Model.getAll(...) as invalid where rule", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getAll({
            where: ["name", "=", 0]
        }).then(fail).catch(error => {
            expect(error.name).to.equal("ModelError");
            expect(error.message).to.equal("Invalid <where> clause: <string> must be an array.");
            done();
        });
    });

    it("throws on Model.getAll(...) as invalid fields in where rules", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getAll({
            where: [
                ["invalid_field", "=", "hi!"]
            ]
        }).then(fail).catch(error => {
            expect(error.name).to.equal("ModelError");
            expect(error.message).to.equal("Invalid field <invalid_field> in <where> clause: not a searchable property.");
            done();
        });
    });

    it("throws on Model.getAll(...) as invalid fields (empty) in where rules", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getAll({
            where: [
                []
            ]
        }).then(fail).catch(error => {
            expect(error.name).to.equal("ModelError");
            expect(error.message).to.equal("Invalid field <false> in <where> clause: not a searchable property.");
            done();
        });
    });

    it("throws on Model.getAll(...) as invalid operator in where rules", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getAll({
            where: [
                ["name", "different", "hi!"]
            ]
        }).then(fail).catch(error => {
            expect(error.name).to.equal("ModelError");
            expect(error.message).to.equal("Invalid operator <different> in <where> clause: not an accepted operator.");
            done();
        });
    });

    it("throws on Model.getAll(...) as invalid search", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getAll({
            search: {}
        }).then(fail).catch(error => {
            expect(error.name).to.equal("ModelError");
            expect(error.message).to.equal("Invalid <search> value: <object> must be a string or undefined.");
            done();
        });
    });

    it("throws on Model.getAll(...) as invalid quantity", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create().getAll({
            quantity: {}
        }).then(fail).catch(error => {
            expect(error.name).to.equal("ModelError");
            expect(error.message).to.equal("Invalid <quantity> value: <object> must be a number or undefined.");
            done();
        });
    });

    it("can not paginate on Model.getAll(...)", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create({
            debugSQL: false
        }).getAll({
            page: undefined,
            quantity: undefined
        }).then(output => {
            const {
                data
            } = output;
            expect(data.length > 20).to.equal(true);
            done();
        }).catch(fail);
    });

    it("ignores on Model.getAll(...) if quantity is under 0", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create({
            debugSQL: false
        }).getAll({
            quantity: -2
        }).then(output => {
            const {
                data
            } = output;
            expect(data.length > 20).to.equal(true);
            done();
        }).catch(fail);
    });

    it("paginates on 20 items on Model.getAll(...) by default", function(done) {
        const User = require(__dirname + "/rest-1/src/models/User.js");
        User.create({
            debugSQL: false
        }).getAll({}).then(output => {
            const {
                data
            } = output;
            expect(data.length).to.equal(20);
            done();
        }).catch(fail);
    });

    it("can debug SQL queries on every CRUD operation", async function() {
        this.timeout(10 * 1000);
        try {
            const User = require(__dirname + "/rest-1/src/models/User.js");
            const user = User.create({
                debugSQL: true
            });
            await user.getAll({});
            await user.getOne(1);
            const {
                id
            } = await user.postOne({
                name: "username",
                password: "password",
                email: "somemail@domain.com",
                alias: "useralias",
                phone: "95959595",
                description: "some description"
            });
            await user.putOne(id, {
                name: "username changed"
            });
            await user.deleteOne(id);
        } catch (error) {
            fail(error);
        }
    });

    it("throws on Model.getAll(...) on invalid order rule (when field not found)", function(done) {
        this.timeout(10 * 1000);
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const user = User.create({});
        user.getAll({
            order: [
                "id", ["3", "asc"],
            ]
        }).then(fail).catch(error => {
            expect(error.message).to.equal("Invalid field <3> in <order> rule: not a searchable property.");
            done();
        });
    });

    it("throws on Model.getAll(...) on invalid order rules (when rule not valid)", function(done) {
        this.timeout(10 * 1000);
        const User = require(__dirname + "/rest-1/src/models/User.js");
        const user = User.create({});
        user.getAll({
            order: [
                {}
            ]
        }).then(fail).catch(error => {
            expect(error.message).to.equal("Invalid <order> rule: <object> must be an array or string.");
            done();
        });
        
    });

});