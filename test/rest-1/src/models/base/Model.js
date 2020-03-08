const Store = require(process.env.PROJECT_ROOT + "/src/stores/Store.js");
const Auth = require(process.env.PROJECT_ROOT + "/src/auths/Auth.js");
const getConnection = require(process.env.PROJECT_ROOT + "/src/getConnection.js");
const utils = require(process.env.PROJECT_ROOT + "/src/utils.js");
const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");
const {
    toIterator
} = utils;
const squel = require("squel");
const path = require("path");

Logger.startsClass("src/models/Model");

class Model {

    static get ModelError() {
        return class extends Error {
            constructor(message) {
                super();
                this.name = "ModelError";
                this.message = message;
            }
        }
    }

    static get querier() {
        return squel;
    }

    static get VALID_OPERATORS() {
        return ["<", "<=", ">", ">=", "<>", "!=", "=", "like", "not like", "in", "not in"];
    }

    static get MODEL_INFO() {
        return new this.constructor.ModelError("[Model] <Model.MODEL_INFO> static property must be overriden.");
    }

    static get MODEL_ATTRIBUTES() {
        return new this.constructor.ModelError("[Model] <Model.MODEL_ATTRIBUTES> static property must be overriden.");
    }

    static get DEFAULT_OPTIONS() {
        return {
            auth: Auth.create({ debugSQL: false }),
            identifierField: "id",
            unselectableFields: ["password", "created_at", "updated_at", "deleted_at"],
            unsettableFields: ["id", "created_at", "updated_at", "deleted_at"],
            debugSQL: false,
            store: Store,
            getConnection(...args) {
                return getConnection(...args);
            }
        };
    }

    static create(...args) {
        return new this(...args);
    }

    constructor(options = {}) {
        Logger.startsMethod("src/models/Model@constructor");
        Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
        Logger.endsMethod("src/models/Model@constructor");
    }

    schema() {
        Logger.startsMethod("src/models/Model@schema");
        Logger.endsMethod("src/models/Model@schema");
        return this.constructor.MODEL_INFO.attributes
            .reduce((out, attribute) => {
                if(this.constructor.DEFAULT_OPTIONS.unselectableFields.indexOf(attribute) !== -1) {
                    return out;
                }
                out.table.attributes.push(attribute);
                out.attributes[attribute] = Object.assign({}, this.constructor.MODEL_ATTRIBUTES[attribute], {
                    schema:undefined,
                    archetype:undefined,
                    typeTerm:undefined,
                    subtype:undefined
                });
                return out;
            }, {
                table: Object.assign({}, this.constructor.MODEL_INFO, {attributes: []}),
                attributes: {}
            });
    }

    getLifecycleToGetAll() {
        Logger.startsMethod("src/models/Model@getLifecycleToGetAll");
        Logger.endsMethod("src/models/Model@getLifecycleToGetAll");
        return [
            "onQuerySetFrom",
            "onQuerySetWhereToFilter",
            "onQuerySetWhereToSearch",
            "onQuerySetFieldsForRecount",
            "onQuerySetFields",
            "onQuerySetLimit",
            "onQuerySetOffset",
            "onQuerySetOrder",
            "onQueryExecutionToGetAll",
        ];
    }

    getAll(parametersReceived = {}) {
        Logger.startsMethod("src/models/Model@getAll");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.select();
                const lifecycle = this.getLifecycleToGetAll();
                const parameters = Object.assign({}, {
                    where: [],
                    page: 0,
                    quantity: 20,
                    order: [],
                    fields: [],
                    search: undefined
                }, parametersReceived, {
                    query,
                }, {
                    lifecycle,
                    scope: this,
                    ok,
                    fail
                });
                toIterator(parameters).next();
            } catch(error) {
                return fail(error);
            }
        }).then(output => new Promise(ok => {
            Logger.endsMethod("src/models/Model@getAll");
            return ok(output);
        })).catch(error => {
            Logger.endsMethod("src/models/Model@getAll");
            throw error;
        });
    }

    getLifecycleToGetOne() {
        Logger.startsMethod("src/models/Model@getLifecycleToGetOne");
        Logger.endsMethod("src/models/Model@getLifecycleToGetOne");
        return [
            "onQuerySetFrom",
            "onQuerySetWhereId",
            "onQuerySetFields",
            "onQueryExecutionToGetOne",
        ];
    }

    getOne(id, fields = []) {
        Logger.startsMethod("src/models/Model@getOne");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.select();
                const lifecycle = this.getLifecycleToGetOne();
                const parameters = Object.assign({}, {
                    lifecycle,
                    scope: this,
                    ok,
                    fail
                }, {
                    query,
                    id,
                    fields,
                });
                toIterator(parameters).next();
            } catch (error) {
                return fail(error);
            }
        }).then((output) => new Promise(ok => {
            Logger.endsMethod("src/models/Model@getOne");
            return ok(output);
        })).catch(error => {
            Logger.endsMethod("src/models/Model@getOne");
            throw error;
        });
    }

    getLifecycleToPostOne() {
        Logger.startsMethod("src/models/Model@getLifecycleToPostOne");
        Logger.endsMethod("src/models/Model@getLifecycleToPostOne");
        return [
            "onQuerySetIntoTable",
            "onQuerySetValues",
            "onQueryExecutionToInsertOne",
            "onSyncFileToPostOne",
        ];
    }

    postOne(item, fields = [], files = {}) {
        Logger.startsMethod("src/models/Model@postOne");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.insert();
                const lifecycle = this.getLifecycleToPostOne();
                const parameters = Object.assign({}, {
                    lifecycle,
                    scope: this,
                    ok,
                    fail
                }, {
                    query,
                    item,
                    fields,
                    files,
                });
                toIterator(parameters).next();
            } catch (error) {
                return fail(error);
            }
        }).then((output) => new Promise(ok => {
            Logger.endsMethod("src/models/Model@postOne");
            return ok(output);
        })).catch(error => {
            Logger.endsMethod("src/models/Model@postOne");
            throw error;
        });
    }

    getLifecycleToPutOne() {
        Logger.startsMethod("src/models/Model@getLifecycleToPutOne");
        Logger.endsMethod("src/models/Model@getLifecycleToPutOne");
        return [
            "onQuerySetTable",
            "onQuerySetValues",
            "onQuerySetWhereId",
            "onQueryExecutionToUpdateOne",
            "onSyncFileToPutOne",
        ];
    }

    putOne(id, item, fields = [], files = {}) {
        Logger.startsMethod("src/models/Model@putOne");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.update();
                const lifecycle = this.getLifecycleToPutOne();
                const parameters = Object.assign({}, {
                    lifecycle,
                    scope: this,
                    ok,
                    fail
                }, {
                    query,
                    id,
                    item,
                    fields,
                    files,
                });
                toIterator(parameters).next();
            } catch (error) {
                return fail(error);
            }
        }).then((output) => new Promise(ok => {
            Logger.endsMethod("src/models/Model@putOne");
            return ok(output);
        }));
    }

    getLifecycleToDeleteOne() {
        Logger.startsMethod("src/models/Model@getLifecycleToDeleteOne");
        Logger.endsMethod("src/models/Model@getLifecycleToDeleteOne");
        return [
            "onQuerySetFrom",
            "onQuerySetWhereId",
            "onQueryExecutionToDeleteOne",
            "onSyncFileToDeleteOne"
        ];
    }

    deleteOne(id) {
        Logger.startsMethod("src/models/Model@deleteOne");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.delete();
                const lifecycle = this.getLifecycleToDeleteOne();
                const parameters = Object.assign({}, {
                    lifecycle,
                    scope: this,
                    ok,
                    fail
                }, {
                    query,
                    id,
                });
                toIterator(parameters).next();
            } catch (error) {
                return fail(error);
            }
        }).then((output) => new Promise(ok => {
            Logger.endsMethod("src/models/Model@deleteOne");
            return ok(output);
        }));
    }

    isField(field) {
        Logger.startsMethod("src/models/Model@isField");
        Logger.endsMethod("src/models/Model@isField");
        return this.constructor.MODEL_INFO.attributes.indexOf(field) !== -1;
    }

    isSelectableField(field) {
        Logger.startsMethod("src/models/Model@isSelectableField");
        Logger.endsMethod("src/models/Model@isSelectableField");
        return this.unselectableFields.indexOf(field) === -1;
    }

    isSettableField(field) {
        Logger.startsMethod("src/models/Model@isSettableField");
        Logger.endsMethod("src/models/Model@isSettableField");
        return this.unsettableFields.indexOf(field) === -1;
    }

    onQuerySetFrom(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetFrom");
        Logger.endsMethod("src/models/Model@onQuerySetFrom");
        const { query } = parameters;
        query.from(this.constructor.MODEL_INFO.table);
    }

    onQuerySetFields(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetFields");
        const { query } = parameters;
        const {
            fields = []
        } = parameters;
        let attributes = fields.length === 0 ? this.constructor.MODEL_INFO.attributes : fields;
        attributes
            .forEach(field => {
                if (this.isSelectableField(field)) {
                    query.field(field);
                };
            });
        Logger.endsMethod("src/models/Model@onQuerySetFields");
    }

    onQuerySetValues(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetValues");
        const { query } = parameters;
        const {
            fields = [],
                item
        } = parameters;
        let attributes = fields.length === 0 ? this.constructor.MODEL_INFO.attributes : fields;
        attributes
            .forEach(field => {
                if (this.isSettableField(field) && field in item) {
                    query.set(field, item[field]);
                }
            });
        Logger.endsMethod("src/models/Model@onQuerySetValues");
    }

    onQuerySetValuesRows(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetValuesRows");
        const { query } = parameters;
        const {
            items,
            fields
        } = parameters;
        if (Array.isArray(items)) {
            query.setFieldsRows(items);
        }
        Logger.endsMethod("src/models/Model@onQuerySetValuesRows");
    }

    onQuerySetFieldsForRecount(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetFieldsForRecount");
        const { query } = parameters;
        parameters.queryForRecount = query.clone();
        parameters.queryForRecount.field("count(*)");
        Logger.endsMethod("src/models/Model@onQuerySetFieldsForRecount");
    }

    onQuerySetWhereToFilter(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetWhereToFilter");
        const { query, where = [] } = parameters;
        for(let index = 0; index < where.length; index++) {
            const whereRule = where[index];
            if (!Array.isArray(whereRule)) {
                Logger.endsMethod("src/models/Model@onQuerySetWhereToFilter");
                return parameters.fail(new this.constructor.ModelError(`Invalid <where> clause: <${typeof whereRule}> must be an array.`));
            }
            const [field = false, operator = false, object = false] = whereRule;
            const isValidOperator = this.constructor.VALID_OPERATORS.indexOf(operator) !== -1;
            const isValidField = this.isField(field) && this.isSelectableField(field);
            if (!isValidField) {
                Logger.endsMethod("src/models/Model@onQuerySetWhereToFilter");
                return parameters.fail(new this.constructor.ModelError(`Invalid field <${field}> in <where> clause: not a searchable property.`));
            }
            if (!isValidOperator) {
                Logger.endsMethod("src/models/Model@onQuerySetWhereToFilter");
                return parameters.fail(new this.constructor.ModelError(`Invalid operator <${operator}> in <where> clause: not an accepted operator.`));
            }
            query.where(`${field} ${operator} ?`, object);
        };
        Logger.endsMethod("src/models/Model@onQuerySetWhereToFilter");
    }

    onQuerySetWhereToSearch(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetWhereToSearch");
        const { query } = parameters;
        if (typeof parameters.search === "undefined") {
            Logger.endsMethod("src/models/Model@onQuerySetWhereToSearch");
            return;
        }
        if (typeof parameters.search !== "string") {
            Logger.endsMethod("src/models/Model@onQuerySetWhereToSearch");
            return parameters.fail(new this.constructor.ModelError(`Invalid <search> value: <${typeof parameters.search}> must be a string or undefined.`));
        }
        const subquery = this.constructor.querier.expr();
        let hasItems = false;
        this.constructor.MODEL_INFO.attributes.forEach((attribute, index) => {
            const isValidField = this.isField(attribute) && this.isSelectableField(attribute);
            if (isValidField) {
                hasItems = true;
                subquery.or(`${attribute} like ?`, `%${parameters.search}%`);
            }
        });
        if (hasItems) {
            query.where(subquery);
        }
        Logger.endsMethod("src/models/Model@onQuerySetWhereToSearch");
    }

    onQuerySetWhereId(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetWhereId");
        const { query } = parameters;
        const {
            id
        } = parameters;
        query.where(`${this.identifierField} = ?`, id);
        Logger.endsMethod("src/models/Model@onQuerySetWhereId");
    }

    onQuerySetWhereIds(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetWhereIds");
        const { query } = parameters;
        const {
            ids
        } = parameters;
        query.where(`${this.identifierField} IN ?`, ids);
        Logger.endsMethod("src/models/Model@onQuerySetWhereIds");
    }

    onQuerySetLimit(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetLimit");
        const { query } = parameters;
        if (typeof parameters.quantity === "undefined") {
            Logger.endsMethod("src/models/Model@onQuerySetLimit");
            return;
        }
        if (typeof parameters.quantity !== "number") {
            Logger.endsMethod("src/models/Model@onQuerySetLimit");
            return parameters.fail(new this.constructor.ModelError(`Invalid <quantity> value: <${typeof parameters.quantity}> must be a number or undefined.`));
        }
        if (parameters.quantity < 0) {
            Logger.endsMethod("src/models/Model@onQuerySetLimit");
            return;
        }
        query.limit(parameters.quantity);
        Logger.endsMethod("src/models/Model@onQuerySetLimit");
    }

    onQuerySetOffset(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetOffset");
        const { query } = parameters;
        if (typeof parameters.page === "undefined") {
            Logger.endsMethod("src/models/Model@onQuerySetOffset");
            return;
        }
        if (typeof parameters.page !== "number") {
            Logger.endsMethod("src/models/Model@onQuerySetOffset");
            return parameters.fail(new this.constructor.ModelError(`Invalid <page> value: <${typeof parameters.page}> must be a number or undefined.`));
        }
        if (parameters.quantity < 0) {
            Logger.endsMethod("src/models/Model@onQuerySetOffset");
            return;
        }
        const quantity = parameters.quantity || 20;
        const offsetValue = quantity * parameters.page;
        if (offsetValue > 0) {
            query.offset(offsetValue);
        }
        Logger.endsMethod("src/models/Model@onQuerySetOffset");
    }

    onQuerySetOrder(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetOrder");
        const { query } = parameters;
        const order = [].concat(parameters.order);
        order.forEach(orderRuleTemp => {
            let orderRule = [];
            if (typeof orderRuleTemp === "string") {
                orderRule.push(orderRuleTemp);
            } else if (Array.isArray(orderRuleTemp)) {
                orderRule = orderRuleTemp;
            } else {
                return parameters.fail(new this.constructor.ModelError(`Invalid <order> rule: <${typeof orderRule}> must be an array or string.`));
            }
            const [field, direction = "asc"] = orderRule;
            const isValidField = this.isField(field) && this.isSelectableField(field);
            if (!isValidField) {
                return parameters.fail(new this.constructor.ModelError(`Invalid field <${field}> in <order> rule: not a searchable property.`));
            }
            query.order(field, direction === "asc");
        });
        Logger.endsMethod("src/models/Model@onQuerySetOrder");
    }

    onQueryExecutionToGetAll(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToGetAll");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            const {
                queryForRecount
            } = parameters;
            const recountRawSQL = queryForRecount.toString();
            this.getConnection().then(connection => {
                let queriesResults = {};
                let queriesIndex = 0;
                const solve = () => {
                    if (queriesIndex === 2) {
                        parameters.output = queriesResults;
                        Logger.endsMethod("src/models/Model@onQueryExecutionToGetAll");
                        return ok();
                    }
                }
                setImmediate(() => {
                    if (this.debugSQL) {
                        Logger.debug("[mysql.select.all] " + rawSQL);
                    }
                    connection.query(rawSQL).then(([results, structure]) => {
                        queriesResults.data = results;
                        queriesResults.structure = structure;
                        return solve(++queriesIndex);
                    }).catch(error => {
                        Logger.endsMethod("");
                        throw error;
                    }).catch(fail);
                });
                setImmediate(() => {
                    if (this.debugSQL) {
                        Logger.debug("[mysql.select.count] " + recountRawSQL);
                    }
                    connection.query(recountRawSQL).then(([results, structure]) => {
                        queriesResults.totalOfItems = results[0]["count(*)"];
                        return solve(++queriesIndex);
                    }).catch(error => {
                        Logger.endsMethod("");
                        throw error;
                    }).catch(fail);
                });
            }).catch(error => {
                Logger.endsMethod("");
                throw error;
            }).catch(fail);
        });
    }

    onQueryExecutionToGetOne(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToGetOne");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.getConnection().then(connection => {
                if (this.debugSQL) {
                    Logger.debug("[mysql.select.one] " + rawSQL);
                }
                connection.query(rawSQL).then(([results, structure]) => {
                    parameters.output = {
                        data: results.length ? results[0] : null,
                        structure
                    };
                    Logger.endsMethod("src/models/Model@onQueryExecutionToGetOne");
                    return ok();
                }).catch(error => {
                    Logger.endsMethod("src/models/Model@onQueryExecutionToGetOne");
                    throw error;
                }).catch(fail);
            }).catch(error => {
                Logger.endsMethod("src/models/Model@onQueryExecutionToGetOne");
                throw error;
            }).catch(fail);
        });
    }

    onQuerySetIntoTable(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetIntoTable");
        const { query } = parameters;
        query.into(this.constructor.MODEL_INFO.table);
        Logger.endsMethod("src/models/Model@onQuerySetIntoTable");
    }

    onQuerySetTable(parameters) {
        Logger.startsMethod("src/models/Model@onQuerySetTable");
        const { query } = parameters;
        query.table(this.constructor.MODEL_INFO.table);
        Logger.endsMethod("src/models/Model@onQuerySetTable");
    }

    onQueryExecutionToInsertOne(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToInsertOne");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.getConnection().then(connection => {
                if (this.debugSQL) {
                    Logger.debug("[mysql.insert.one] " + rawSQL);
                }
                connection.query(rawSQL).then(([results]) => {
                    parameters.output = {
                        id: results.insertId
                    };
                    return ok();
                }).catch(fail);
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToInsertOne");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToInsertOne");
            throw error;
        });
    }

    onSyncFileToPostOne(parameters) {
        Logger.startsMethod("src/models/Model@onSyncFileToPostOne");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            if (!("stores" in this.constructor.MODEL_INFO)) {
                return ok();
            }
            const {
                table,
                stores
            } = this.constructor.MODEL_INFO;
            const storeNames = Object.keys(stores).filter(store => store in parameters.files && typeof parameters.files[store] === "object");
            if (storeNames.length === 0) {
                return ok();
            }
            const {
                id
            } = parameters.output;
            this.getOne(id).then(results => {
                const store = this.store.create();
                const {
                    data
                } = results;
                let index = 0;
                const next = () => {
                    index++;
                    if (index >= storeNames.length) {
                        return ok();
                    }
                }
                storeNames.forEach(storeName => {
                    const {
                        contents = null, extension = "txt", options = {}
                    } = parameters.files[storeName];
                    if (contents !== null) {
                        store.writeFile(`${table}.${storeName}.${data.id}.txt`, contents, options)
                            .then(next)
                            .catch(fail);
                    } else {
                        return next();
                    }
                });
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onSyncFileToPostOne");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onSyncFileToPostOne");
            throw error;
        });
    }

    onQueryExecutionToInsertAll(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToInsertAll");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.getConnection().then(connection => {
                if (this.debugSQL) {
                    Logger.debug("[mysql.insert.all] " + rawSQL);
                }
                connection.query(rawSQL).then(([results]) => {
                    parameters.output = {
                        id: results.insertId,
                        affectedRows: results.affectedRows,
                        info: results.info
                    };
                    return ok();
                }).catch(fail);
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToInsertAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToInsertAll");
            throw error;
        });
    }

    onSyncFileToPostAll(parameters) {
        Logger.startsMethod("src/models/Model@onSyncFileToPostAll");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            // @TODO
            Logger.endsMethod("src/models/Model@onSyncFileToPostAll");
            return ok();
        });
    }

    onQueryExecutionToUpdateOne(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToUpdateOne");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.getConnection().then(connection => {
                if (this.debugSQL) {
                    Logger.debug("[mysql.update.one] " + rawSQL);
                }
                connection.query(rawSQL).then(([results]) => {
                    parameters.output = Object.assign({}, {
                        changedItems: results.changedRows
                    }, results.changedRows > 0 ? {
                        id: parameters.id
                    } : {});
                    return ok();
                }).catch(fail);
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToUpdateOne");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToUpdateOne");
            throw error;
        });
    }

    onQueryExecutionToUpdateAll(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToUpdateAll");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.getConnection().then(connection => {
                if (this.debugSQL) {
                    Logger.debug("[mysql.update.all] " + rawSQL);
                }
                connection.query(rawSQL).then(([results]) => {
                    parameters.output = {
                        id: results.insertId,
                        affectedRows: results.affectedRows,
                        info: results.info
                    };
                    return ok();
                }).catch(fail);
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToUpdateAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToUpdateAll");
            throw error;
        });
    }

    onSyncFileToPutAll(parameters) {
        Logger.startsMethod("src/models/Model@onSyncFileToPutAll");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            return ok();
        }).then(output => {
            Logger.endsMethod("src/models/Model@onSyncFileToPutAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onSyncFileToPutAll");
            throw error;
        });
    }

    onSyncFileToPutOne(parameters) {
        Logger.startsMethod("src/models/Model@onSyncFileToPutOne");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            if (!("stores" in this.constructor.MODEL_INFO)) {
                return ok();
            }
            const {
                table,
                stores
            } = this.constructor.MODEL_INFO;
            const storeNames = Object.keys(stores).filter(store => store in parameters.files);
            if (storeNames.length === 0) {
                return ok();
            }
            const {
                id
            } = parameters.output;
            this.getOne(id).then(results => {
                const store = this.store.create();
                const {
                    data
                } = results;
                let index = 0;
                const next = () => {
                    index++;
                    if (index >= storeNames.length) {
                        return ok();
                    }
                }
                storeNames.forEach(storeName => {
                    const {
                        contents = null, extension = "txt", options = {}
                    } = parameters.files[storeName];
                    if (contents !== null) {
                        store.updateFile(`${table}.${storeName}.${data.id}.txt`, contents)
                            .then(next)
                            .catch(fail);
                    } else {
                        return next();
                    }
                });
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onSyncFileToPutOne");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onSyncFileToPutOne");
            throw error;
        });
    }

    onQueryExecutionToDeleteOne(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToDeleteOne");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.getConnection().then(connection => {
                if (this.debugSQL) {
                    Logger.debug("[mysql.delete.one] " + rawSQL);
                }
                connection.query(rawSQL).then(([results]) => {
                    parameters.output = {
                        id: results.insertId,
                        affectedRows: results.affectedRows,
                        info: results.info
                    };
                    return ok();
                }).catch(fail);
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToDeleteOne");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToDeleteOne");
            throw error;
        });
    }

    onSyncFileToDeleteOne(parameters) {
        Logger.startsMethod("src/models/Model@onSyncFileToDeleteOne");
        const { query } = parameters;
        if (!("stores" in this.constructor.MODEL_INFO)) {
            return;
        }
        return new Promise((ok, fail) => {
            const {
                table,
                stores
            } = this.constructor.MODEL_INFO;
            const storeNames = Object.keys(stores);
            if (storeNames.length === 0) {
                return ok();
            }
            const {
                id
            } = parameters.output;
            const store = this.store.create();
            let index = 0;
            const next = () => {
                index++;
                if (index >= storeNames.length) {
                    return ok();
                }
            }
            storeNames.forEach(storeName => {
                const filename = `${table}.${storeName}.${id}.txt`;
                store.hasFile(filename).then(() => {
                    store.deleteFile(filename)
                        .then(next)
                        .catch(fail);
                }).catch(next);
            });
        }).then(output => {
            Logger.endsMethod("src/models/Model@onSyncFileToDeleteOne");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onSyncFileToDeleteOne");
            throw error;
        });
    }

    onQueryExecutionToDeleteAll(parameters) {
        Logger.startsMethod("src/models/Model@onQueryExecutionToDeleteAll");
        const { query } = parameters;
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.getConnection().then(connection => {
                if (this.debugSQL) {
                    Logger.debug("[mysql.delete.all] " + rawSQL);
                }
                connection.query(rawSQL).then(([results]) => {
                    parameters.output = {
                        id: parameters.id,
                        affectedRows: results.affectedRows
                    };
                    return ok();
                }).catch(fail);
            }).catch(fail);
        }).then(output => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToDeleteAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onQueryExecutionToDeleteAll");
            throw error;
        });
    }

    onSyncFileToDeleteAll(parameters) {
        Logger.startsMethod("src/models/Model@onSyncFileToDeleteAll");
        const { query } = parameters;
        if (!("stores" in this.constructor.MODEL_INFO)) {
            return;
        }
        return new Promise((ok, fail) => {
            const {
                table,
                stores
            } = this.constructor.MODEL_INFO;
            const storeNames = Object.keys(stores);
            if (storeNames.length === 0) {
                return ok();
            }
            const {
                id
            } = parameters.output;
            const store = this.store.create();
            let index = 0;
            const next = () => {
                index++;
                if (index >= storeNames.length) {
                    return ok();
                }
            }
            storeNames.forEach(storeName => {
                const filename = `${table}.${storeName}.${id}.txt`;
                store.hasFile(filename).then(() => {
                    store.deleteFile(filename)
                        .then(next)
                        .catch(fail);
                }).catch(next);
            });
        }).then(output => {
            Logger.endsMethod("src/models/Model@onSyncFileToDeleteAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@onSyncFileToDeleteAll");
            throw error;
        });
    }


    getLifecycleToPostAll() {
        Logger.startsMethod("src/models/Model@getLifecycleToPostAll");
        Logger.endsMethod("src/models/Model@getLifecycleToPostAll");
        return [
            "onQuerySetIntoTable",
            "onQuerySetValuesRows",
            "onQueryExecutionToInsertAll",
            "onSyncFileToPostAll",
        ];
    }

    postAll(items, fields = [], files = []) {
        Logger.startsMethod("src/models/Model@postAll");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.insert();
                const lifecycle = this.getLifecycleToPostAll();
                const parameters = Object.assign({
                    lifecycle,
                    scope: this,
                    ok,
                    fail,
                },{
                    query,
                    items,
                    fields,
                    files,
                });
                toIterator(parameters).next();
            } catch (error) {
                return fail(error);
            }
        }).then(output => {
            Logger.endsMethod("src/models/Model@postAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@postAll");
            throw error;
        });
    }

    getLifecycleToPutAll() {
        Logger.startsMethod("src/models/Model@getLifecycleToPutAll");
        Logger.endsMethod("src/models/Model@getLifecycleToPutAll");
        return [
            "onQuerySetTable",
            "onQuerySetValues",
            "onQuerySetWhereIds",
            "onQueryExecutionToUpdateAll",
            "onSyncFileToPutAll",
        ];
    }

    putAll(ids, item, files = []) {
        Logger.startsMethod("src/models/Model@putAll");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.update();
                const lifecycle = this.getLifecycleToPutAll();
                const parameters = Object.assign({
                    scope: this,
                    lifecycle,
                    ok,
                    fail,
                }, {
                    query,
                    ids,
                    item,
                    files,
                });
                toIterator(parameters).next();
            } catch (error) {
                return fail(error);
            }
        }).then(output => {
            Logger.endsMethod("src/models/Model@putAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@putAll");
            throw error;
        });
    }

    getLifecycleToDeleteAll() {
        Logger.startsMethod("src/models/Model@getLifecycleToDeleteAll");
        Logger.endsMethod("src/models/Model@getLifecycleToDeleteAll");
        return [
            "onQuerySetFrom",
            "onQuerySetWhereIds",
            "onQueryExecutionToDeleteAll",
            "onSyncFileToDeleteAll"
        ];
    }

    deleteAll(ids) {
        Logger.startsMethod("src/models/Model@deleteAll");
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.delete();
                const lifecycle = this.getLifecycleToDeleteAll();
                const parameters = Object.assign({
                    scope: this,
                    lifecycle,
                    ok,
                    fail,
                }, {
                    query,
                    ids,
                });
                toIterator(parameters).next();
            } catch (error) {
                return fail(error);
            }
        }).then(output => {
            Logger.endsMethod("src/models/Model@deleteAll");
            return new Promise(ok => ok(output));
        }).catch(error => {
            Logger.endsMethod("src/models/Model@deleteAll");
            throw error;
        });
    }

}

Logger.endsClass("src/models/Model");

module.exports = Model;