const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../../models/User.js");

class UserControllerBase extends Controller {

	static get MODEL_CLASS() {
		return Model;
	}

}

module.exports = UserControllerBase;