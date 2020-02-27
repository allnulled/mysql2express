const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../models/UserAndRoleModel.js");

class UserAndRole extends Controller {

	static get REFERENCED_MODEL() {
		return Model;
	}

}

module.exports = UserAndRole;