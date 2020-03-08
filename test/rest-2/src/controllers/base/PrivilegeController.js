const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../../models/Privilege.js");

class PrivilegeControllerBase extends Controller {

	static get MODEL_CLASS() {
		return Model;
	}

}

module.exports = PrivilegeControllerBase;