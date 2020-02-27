const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../models/RoleModel.js");

class Role extends Controller {

	static get REFERENCED_MODEL() {
		return Model;
	}

}

module.exports = Role;