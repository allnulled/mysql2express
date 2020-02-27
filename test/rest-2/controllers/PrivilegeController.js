const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../models/PrivilegeModel.js");

class Privilege extends Controller {

	static get REFERENCED_MODEL() {
		return Model;
	}

}

module.exports = Privilege;