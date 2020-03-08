const { expect } = require("chai");

describe("Model.getAll({...})", function() {

	const fail = (error) => {
		console.log("Showing error from test:", error);
		expect(true).to.equal(false);
	};

	it("can query using fields", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		this.timeout(10 * 1000);
		User.create().getAll({
			fields: ["id", "name"]
		}).then(({data}) => {
			expect(data.length).to.not.equal(0);
			expect(Object.keys(data[0])).to.deep.equal(["id","name"]);
			return done();
		}).catch(fail);
	});


	it("can query using <where:like> filter", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			where: [
				["name", "like", "d0c%"]
			],
			order: ["id"]
		}).then((result) => {
			const { data, totalOfItems, structure } = result;
			expect(data.length).to.not.equal(0);
			expect(data[0].name).to.deep.equal("d0ciam0tszg4sbmg5cjk9qsf8ph8ng0k");
			return done();
		}).catch(fail);
	});

	it("can query using <where:not like> filters", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			where: [
				["name", "not like", "cdd%"]
			],
			order: ["id"]
		}).then((result) => {
			const { data, totalOfItems, structure } = result;
			expect(data.length).to.not.equal(0);
			expect(data[0].name).to.deep.equal("d0ciam0tszg4sbmg5cjk9qsf8ph8ng0k");
			return done();
		}).catch(fail);
	});

	it("can query using <where:in> filters + <order> sortings", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			where: [
				["name", "in", [
					"go14c12nm8b05c427emz9inhw1g86blb",
					"68v3finetuu698kwed7uc6a8n4lzb3a9"
				]]
			],
			order: [
				"id", 
				["name", "desc"]
			]
		}).then((result) => {
			const { data, totalOfItems, structure } = result;
			expect(data.length).to.equal(2);
			expect(data[0].name).to.deep.equal("go14c12nm8b05c427emz9inhw1g86blb");
			return done();
		}).catch(fail);
	});

	it("can query using <where:not in> filters", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			where: [
				["name", "not in", [
					"cddnf04skneh3fcgov4ztpnk3411seo3",
					"d0ciam0tszg4sbmg5cjk9qsf8ph8ng0k"
				]]
			],
			order: ["id"]
		}).then((result) => {
			const { data, totalOfItems, structure } = result;
			expect(data.length).to.not.equal(0);
			expect(data[0].name).to.deep.equal("go14c12nm8b05c427emz9inhw1g86blb");
			return done();
		}).catch(fail);
	});

	it("paginates results (by default) + returns total of items for pagination", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll().then(result => {
			const { data, totalOfItems } = result;
			expect(data.length).to.equal(20);
			expect(totalOfItems).to.equal(1000);
			done();
		}).catch(fail);
	});

	it("can search by string", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			search: "cdd",
			order: "id"
		}).then(result => {
			const { data, totalOfItems } = result;
			expect(data.length).to.not.equal(0);
			expect(data[0].name).to.equal("cddnf04skneh3fcgov4ztpnk3411seo3");
			done();
		}).catch(fail);
	});

	it("can limit the number of items for pagination", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			quantity: 1,
			order: "id",
			// page: 0 // this is the default
		}).then(result => {
			const { data, totalOfItems } = result;
			expect(data.length).to.equal(1);
			expect(data[0].name).to.equal("cddnf04skneh3fcgov4ztpnk3411seo3");
			done();
		}).catch(fail);
	});

	it("can choose the page for pagination", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			quantity: 1,
			order: "id",
			page: 1
		}).then(result => {
			const { data, totalOfItems } = result;
			expect(data.length).to.equal(1);
			expect(data[0].name).to.equal("d0ciam0tszg4sbmg5cjk9qsf8ph8ng0k");
			done();
		}).catch(fail);
	});

	it("can reverse the order", function(done) {
		const User = require(__dirname + "/rest-1/src/models/User.js");
		User.create().getAll({
			quantity: 2,
			order: [["id", "desc"]],
			page: 0
		}).then(result => {
			const { data, totalOfItems } = result;
			expect(data.length).to.equal(2);
			expect(data[0].name).to.equal("yq4evrn0t1rovkvjgi4kxsaljp2ad62i");
			done();
		}).catch(fail);
	});
	
});