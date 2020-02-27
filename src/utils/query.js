const fs = require("fs");
const mysql = require("mysql2");

module.exports = function DefaultQuery(credentials, options) {
	return new Promise((ok, fail) => {
		const database = credentials.database;
		const queryForColumns = fs.readFileSync(__dirname + "/query.sql").toString().replace("${DATABASE_NAME}", database);
		const queryForConstraints = fs.readFileSync(__dirname + "/query-constraints.sql").toString().replace("${DATABASE_NAME}", database);
		const connection = mysql.createConnection(credentials);
		connection.query(queryForColumns, (error, columns) => {
			if(error) {
				connection.close();
				return fail(error);
			}
			connection.query(queryForConstraints, (error, constraints) => {
				connection.close();
				if(error) {
					return fail(error);
				}
				return ok({columns, constraints});
			});
		});
	});
}