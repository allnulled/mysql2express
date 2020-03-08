const StoreBase = require(__dirname + "/base/Store.js");

class Store extends StoreBase {

	static get DEFAULT_OPTIONS() {
		return {
			basedir: __dirname + "/_files_"
		};
	}

}

module.exports = Store;