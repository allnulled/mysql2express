const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../../models/UserAndCommunity.js");

class UserAndCommunityControllerBase extends Controller {

	static get MODEL_CLASS() {
		return Model;
	}

}

module.exports = UserAndCommunityControllerBase;