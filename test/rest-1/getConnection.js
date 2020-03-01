const mysql = require("mysql2/promise");

///////////////////////////////////////////////////////
// This data should be imported from somewhere else  //
// and should not be hardcoded in any "public" file. //
// However, it will work this way too.               //
///////////////////////////////////////////////////////
const config = {
			"user": "test",
			"password": "test",
			"database": "database1"
		};
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const connectionPromise = new Promise((ok, fail) => {
	mysql.createConnection({...config, multipleStatements: true}).then(connection => {
		ok(connection);
	}).catch(error => {
		fail(error);
	});
});

module.exports = function() {
	return connectionPromise;
}