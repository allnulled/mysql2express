const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../../models/Community.js");

class CommunityControllerBase extends Controller {

	static get MODEL_CLASS() {
		return Model;
	}

}

module.exports = CommunityControllerBase;