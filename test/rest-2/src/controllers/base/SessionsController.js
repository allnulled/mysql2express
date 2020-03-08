const Controller = require(__dirname + "/Controller.js");
const Model = require(__dirname + "/../../models/Sessions.js");

class SessionsControllerBase extends Controller {

	static get MODEL_CLASS() {
		return Model;
	}

}

module.exports = SessionsControllerBase;