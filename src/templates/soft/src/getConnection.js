const mysql = require("mysql2/promise");

///////////////////////////////////////////////////////
// This data should be imported from somewhere else  //
// and should not be hardcoded in any "public" file. //
// However, it will work this way too.               //
///////////////////////////////////////////////////////
const config = <%-JSON.stringify(credentials, null, "\t").split(require("os").EOL).join(require("os").EOL + "\t\t")%>;
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