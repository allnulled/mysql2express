const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../models/UserModel.js");

class User extends Controller {

	static get REFERENCED_MODEL() {
		return Model;
	}

}

module.exports = User;