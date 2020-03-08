const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../../models/ZExampleOfAll.js");

class ZExampleOfAllControllerBase extends Controller {

	static get MODEL_CLASS() {
		return Model;
	}

}

module.exports = ZExampleOfAllControllerBase;