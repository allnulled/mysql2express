const squel = require("squel");
const getConnection = require(process.env.PROJECT_ROOT + "/src/getConnection.js");
const utils = require(process.env.PROJECT_ROOT + "/src/utils.js");
const schema = require(process.env.PROJECT_ROOT + "/src/schema.json");
const { toIterator, findIn, fromRowsToObject } = require(process.env.PROJECT_ROOT + "/src/utils.js");
const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");

class AuthBase {

	static get DEFAULT_OPTIONS() {
		return {
			debugSQL: false,
			tables: {
				user: "user", // id, name, password, email
				community: "community", // id, name
				privilege: "privilege", // id, name
				community_and_privilege: "community_and_privilege", // id, id_community, id_privilege
				user_and_community: "user_and_community", // id, id_user, id_community
				// session: "session" // id, data
			},
			data: {
				user: undefined,
				privileges: [],
				communities: [],
				session: false
			}
		}
	}

	static create(...args) {
		return new this(...args);
	}

	onQueryAuthenticationBuild(parameters) {
		Logger.startsMethod("src/auths/Auth@onQueryAuthenticationBuild");
		return new Promise((ok, fail) => {
			const {
				query,
				credentials
			} = parameters;
			query.from(this.tables.user);
			query.where(`${this.tables.user}.name = ?`, credentials.user);
			query.where(`${this.tables.user}.password = ?`, credentials.password);
			query.left_join(this.tables.user_and_community, null, `${this.tables.user_and_community}.id_user = ${this.tables.user}.id`);
			query.left_join(this.tables.community, null, `${this.tables.user_and_community}.id_community = ${this.tables.community}.id`);
			query.left_join(this.tables.community_and_privilege, null, `${this.tables.community_and_privilege}.id_community = ${this.tables.community}.id`);
			query.left_join(this.tables.privilege, null, `${this.tables.community_and_privilege}.id_privilege = ${this.tables.privilege}.id`);
			Object.keys(this.tables).forEach(tableAlias => {
				const table = this.tables[tableAlias];
				const model = utils.toPascalCase(table);
				schema.models[model].attributes.forEach(attribute => {
					query.field(`${table}.${attribute}`, `${tableAlias}.${attribute}`)
				});
			});
			Logger.endsMethod("src/auths/Auth@onQueryAuthenticationBuild");
			return ok();
		});
	}

	onQueryAuthenticationExecute(parameters) {
		Logger.startsMethod("src/auths/Auth@onQueryAuthenticationExecute");
		return new Promise((ok, fail) => {
			const {
				query,
				credentials
			} = parameters;
			getConnection().then(connection => {
				const rawSQL = query.toString();
				if (this.debugSQL) {
					console.log("[mysql.authenticate] " + rawSQL);
				}
				connection.query(rawSQL).then(([results, structure]) => {
					if (results.length) {
						parameters.resultSQL = {
							data: results,
							structure
						};
						Logger.endsMethod("src/auths/Auth@onQueryAuthenticationExecute");
						return ok();
					} else {
						Logger.endsMethod("src/auths/Auth@onQueryAuthenticationExecute");
						return fail(new Error("UserNotFoundError"));
					}
				}).catch(fail);
			}).catch(fail);
		});
	}

	onQueryAuthenticationSort(parameters) {
		Logger.startsMethod("src/auths/Auth@onQueryAuthenticationSort");
		const users = fromRowsToObject(parameters.resultSQL.data, "user", "id");
		const communities = fromRowsToObject(parameters.resultSQL.data, "community", "id");
		const privileges = fromRowsToObject(parameters.resultSQL.data, "privilege", "id");
		parameters.output = { user: users[0], communities, privileges };
		this.data = Object.assign({}, parameters.output);
		parameters.exit = true;
		Logger.endsMethod("src/auths/Auth@onQueryAuthenticationSort");
		return parameters.ok(parameters.output);
	}

	getAuthenticateLifecycle() {
		return [
			"onQueryAuthenticationBuild",
			"onQueryAuthenticationExecute",
			"onQueryAuthenticationSort"
		];
	}

	reauthenticate(credentials = {}) {
		return new Promise((ok, fail) => {
			this.credentials = Object.assign({}, this.credentials || {}, credentials);
			const lifecycle = this.getAuthenticateLifecycle();
			const parameters = {
				credentials,
				lifecycle,
				scope: this,
				ok,
				fail,
				query: squel.select()
			};
			toIterator(parameters).next();
		});
	}

	authenticate(...args) {
		if (typeof this.data.user !== "undefined" && this.data.user !== null) {
			return new Promise(ok => ok(this.data));
		}
		return this.reauthenticate(...args);
	}

	hasCommunityById(communityId) {
		const matches = this.data.communities.filter(community => community.id === communityId);
		return matches.length ? matches : false;
	}

	hasPrivilegeById(privilegeId) {
		const matches = this.data.privileges.filter(privilege => privilege.id === privilegeId);
		return matches.length ? matches : false;
	}

	hasCommunityByName(communityName) {
		const matches = this.data.communities.filter(community => community.name === communityName);
		return matches.length ? matches : false;
	}

	hasPrivilegeByName(privilegeName) {
		const matches = this.data.privileges.filter(privilege => privilege.name === privilegeName);
		return matches.length ? matches.length : false;
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
	}

	isAuthenticated() {
		return typeof this.data.user !== "undefined";
	}

	toData() {
		return JSON.parse(JSON.stringify(this));
	}

}

module.exports = AuthBase;