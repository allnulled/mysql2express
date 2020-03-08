const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../../models/CommunityAndPrivilege.js");

class CommunityAndPrivilegeControllerBase extends Controller {

	static get MODEL_CLASS() {
		return Model;
	}

}

module.exports = CommunityAndPrivilegeControllerBase;