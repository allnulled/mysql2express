const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../models/RoleAndPrivilegeModel.js");

class RoleAndPrivilege extends Controller {

	static get REFERENCED_MODEL() {
		return Model;
	}

}

module.exports = RoleAndPrivilege;