const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../models/ZExampleOfAllModel.js");

class ZExampleOfAll extends Controller {

	static get REFERENCED_MODEL() {
		return Model;
	}

}

module.exports = ZExampleOfAll;