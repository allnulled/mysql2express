const getConnection = require(__dirname + "/../getConnection.js");
const squel = require("squel");
const path = require("path");

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
        throw new this.constructor.ModelError("[Model] <Model.MODEL_INFO> static property must be overriden.");
    }

    static get MODEL_ATTRIBUTES() {
        throw new this.constructor.ModelError("[Model] <Model.MODEL_ATTRIBUTES> static property must be overriden.");
    }

    static get DEFAULT_OPTIONS() {
        return {
            identifierField: "id",
            unselectableFields: ["password", "created_at", "updated_at", "deleted_at"],
            unsettableFields: ["id", "created_at", "updated_at", "deleted_at"],
            debugSQL: false,
            store: require(__dirname + "/../stores/Store.js"),
        };
    }

    static getConnection(...args) {
        return getConnection(...args);
    }

    static create(...args) {
        return new this(...args);
    }

    constructor(options = {}) {
        Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
    }

    schema() {
        return {
            model: this.constructor.MODEL_INFO,
            attributes: this.constructor.MODEL_ATTRIBUTES
        };
    }

    getLifecycleForGetAll() {
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

    getAll(parametersPassed = {}) {
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.select();
                const lifecycle = this.getLifecycleForGetAll();
                const parameters = Object.assign({
                    query,
                    lifecycle,
                    settings: {}
                }, {
                    where: [],
                    page: 0,
                    quantity: 20,
                    order: [], // recommended: ["id", "asc"],
                    fields: [],
                    search: undefined
                }, parametersPassed, {
                    ok,
                    fail
                });
                for (let indexCycle = 0; indexCycle < lifecycle.length; indexCycle++) {
                    this[lifecycle[indexCycle]](query, parameters);
                }
            } catch (error) {
                return fail(error);
            }
        });
    }

    getLifecycleForGetOne() {
        return [
            "onQuerySetFrom",
            "onQuerySetWhereId",
            "onQuerySetFields",
            "onQueryExecutionToGetOne",
        ];
    }

    getOne(id, fields = []) {
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.select();
                const lifecycle = this.getLifecycleForGetOne();
                const parameters = {
                    query,
                    lifecycle,
                    settings: {},
                    id,
                    fields,
                    ok,
                    fail
                };
                for (let indexCycle = 0; indexCycle < lifecycle.length; indexCycle++) {
                    this[lifecycle[indexCycle]](query, parameters);
                }
            } catch (error) {
                return fail(error);
            }
        });
    }

    getLifecycleForPostOne() {
        return [
            "onQuerySetIntoTable",
            "onQuerySetValues",
            "onQueryExecutionToInsertOne",
            "onSyncFileToPostOne",
        ];
    }

    postOne(item, fields = [], files = {}) {
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.insert();
                const lifecycle = this.getLifecycleForPostOne();
                const parameters = Object.assign({}, {
                    scope: this,
                    index: 0,
                    lifecycle,
                    output: undefined,
                    exit: false,
                    next() {
                        if (parameters.index < parameters.lifecycle.length) {
                            if (parameters.exit) {
                                return ok(parameters.output);
                            }
                            const output = parameters.scope[parameters.lifecycle[parameters.index++]](parameters.query, parameters);
                            if (output instanceof Promise) {
                                return output.then(parameters.next).catch(parameters.fail);
                            }
                            return setImmediate(parameters.next);
                        } else {
                            return ok(parameters.output);
                        }
                    }
                }, {
                    query,
                    settings: {},
                    item,
                    fields,
                    files,
                    ok,
                    fail,
                });
                parameters.next();
            } catch (error) {
                return fail(error);
            }
        });
    }

    getLifecycleForPutOne() {
        return [
            "onQuerySetTable",
            "onQuerySetValues",
            "onQuerySetWhereId",
            "onQueryExecutionToUpdateOne",
            "onSyncFileToPutOne",
        ];
    }

    putOne(id, item, fields = [], files = {}) {
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.update();
                const lifecycle = this.getLifecycleForPutOne();
                const parameters = Object.assign({}, {
                    scope: this,
                    index: 0,
                    lifecycle,
                    output: undefined,
                    exit: false,
                    next() {
                        if (parameters.index < parameters.lifecycle.length) {
                            if (parameters.exit) {
                                return ok(parameters.output);
                            }
                            const output = parameters.scope[parameters.lifecycle[parameters.index++]](parameters.query, parameters);
                            if (output instanceof Promise) {
                                return output.then(parameters.next).catch(parameters.fail);
                            }
                            return setImmediate(parameters.next);
                        } else {
                            return ok(parameters.output);
                        }
                    }
                }, {
                    query,
                    settings: {},
                    id,
                    item,
                    fields,
                    files,
                    ok,
                    fail,
                });
                parameters.next();
            } catch (error) {
                return fail(error);
            }
        });
    }

    getLifecycleForDeleteOne() {
        return [
            "onQuerySetFrom",
            "onQuerySetWhereId",
            "onQueryExecutionToDeleteOne",
        ];
    }

    deleteOne(id) {
        return new Promise((ok, fail) => {
            try {
                const query = this.constructor.querier.delete();
                const lifecycle = this.getLifecycleForDeleteOne();
                const parameters = {
                    query,
                    lifecycle,
                    settings: {},
                    id,
                    ok,
                    fail
                };
                for (let indexCycle = 0; indexCycle < lifecycle.length; indexCycle++) {
                    this[lifecycle[indexCycle]](query, parameters);
                }
            } catch (error) {
                return fail(error);
            }
        });
    }

    isField(field) {
        return this.constructor.MODEL_INFO.attributes.indexOf(field) !== -1;
    }

    isSelectableField(field) {
        return this.unselectableFields.indexOf(field) === -1;
    }

    isSettableField(field) {
        return this.unsettableFields.indexOf(field) === -1;
    }

    onQuerySetFrom(query, parameters) {
        query.from(this.constructor.MODEL_INFO.table);
    }

    onQuerySetFields(query, parameters) {
        const {
            fields
        } = parameters;
        let attributes = fields.length === 0 ? this.constructor.MODEL_INFO.attributes : fields;
        attributes
            .filter(field => this.isSelectableField(field))
            .forEach(field => query.field(field));
    }

    onQuerySetValues(query, parameters) {
        const {
            fields,
            item
        } = parameters;
        let attributes = fields.length === 0 ? this.constructor.MODEL_INFO.attributes : fields;
        attributes
            .filter(field => this.isSettableField(field) && field in item)
            .forEach(field => query.set(field, item[field]));
    }

    onQuerySetFieldsForRecount(query, parameters) {
        parameters.queryForRecount = query.clone();
        parameters.queryForRecount.field("count(*)");
    }

    onQuerySetWhereToFilter(query, parameters) {
        parameters.where.forEach(whereRule => {
            if (!Array.isArray(whereRule)) {
                throw new this.constructor.ModelError(`Invalid <where> clause: <${typeof whereRule}> must be an array.`);
            }
            const [field = false, operator = false, object = false] = whereRule;
            const isValidOperator = this.constructor.VALID_OPERATORS.indexOf(operator) !== -1;
            const isValidField = this.isField(field) && this.isSelectableField(field);
            if (!isValidField) {
                throw new this.constructor.ModelError(`Invalid field <${field}> in <where> clause: not a searchable property.`);
            }
            if (!isValidOperator) {
                throw new this.constructor.ModelError(`Invalid operator <${operator}> in <where> clause: not an accepted operator.`);
            }
            query.where(`${field} ${operator} ?`, object);
        });
    }

    onQuerySetWhereToSearch(query, parameters) {
        if (typeof parameters.search === "undefined") {
            return;
        }
        if (typeof parameters.search !== "string") {
            throw new this.constructor.ModelError(`Invalid <search> value: <${typeof parameters.search}> must be a string or undefined.`);
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
    }

    onQuerySetWhereId(query, parameters) {
        const {
            id
        } = parameters;
        query.where(`${this.identifierField} = ?`, id);
    }

    onQuerySetLimit(query, parameters) {
        if (typeof parameters.quantity === "undefined") {
            return;
        }
        if (typeof parameters.quantity !== "number") {
            throw new this.constructor.ModelError(`Invalid <quantity> value: <${typeof parameters.quantity}> must be a number or undefined.`);
        }
        if (parameters.quantity < 0) {
            return;
        }
        query.limit(parameters.quantity);
    }

    onQuerySetOffset(query, parameters) {
        if (typeof parameters.page === "undefined") {
            return;
        }
        if (typeof parameters.page !== "number") {
            throw new this.constructor.ModelError(`Invalid <page> value: <${typeof parameters.page}> must be a number or undefined.`);
        }
        if (parameters.quantity < 0) {
            return;
        }
        const quantity = parameters.quantity || 20;
        const offsetValue = quantity * parameters.page;
        if (offsetValue > 0) {
            query.offset(offsetValue);
        }
    }

    onQuerySetOrder(query, parameters) {
        const order = [].concat(parameters.order);
        order.forEach(orderRuleTemp => {
            let orderRule = [];
            if (typeof orderRuleTemp === "string") {
                orderRule.push(orderRuleTemp);
            } else if (Array.isArray(orderRuleTemp)) {
                orderRule = orderRuleTemp;
            } else {
                throw new this.constructor.ModelError(`Invalid <order> rule: <${typeof orderRule}> must be an array or string.`);
            }
            const [field, direction = "asc"] = orderRule;
            const isValidField = this.isField(field) && this.isSelectableField(field);
            if (!isValidField) {
                throw new this.constructor.ModelError(`Invalid field <${field}> in <order> rule: not a searchable property.`);
            }
            query.order(field, direction === "asc");
        });
    }

    onQueryExecutionToGetAll(query, parameters) {
        const {
            ok,
            fail
        } = parameters;
        const rawSQL = query.toString();
        const {
            queryForRecount
        } = parameters;
        const recountRawSQL = queryForRecount.toString();
        this.constructor.getConnection().then(connection => {
            if (this.debugSQL) {
                console.log("[mysql.select.all] " + rawSQL);
            }
            let queriesResults = {};
            let queriesIndex = 0;
            connection.query(rawSQL).then(([results, structure]) => {
                queriesIndex++;
                queriesResults.data = results;
                queriesResults.structure = structure;
                if (queriesIndex === 2) {
                    return ok(queriesResults);
                }
            }).catch(fail);
            if (this.debugSQL) {
                console.log("[mysql.select.count] " + recountRawSQL);
            }
            connection.query(recountRawSQL).then(([results, structure]) => {
                queriesIndex++;
                queriesResults.totalOfItems = results[0]["count(*)"];
                if (queriesIndex === 2) {
                    return ok(queriesResults);
                }
            }).catch(fail);
        }).catch(fail);
    }

    onQueryExecutionToGetOne(query, parameters) {
        const {
            ok,
            fail
        } = parameters;
        const rawSQL = query.toString();
        this.constructor.getConnection().then(connection => {
            if (this.debugSQL) {
                console.log("[mysql.select.one] " + rawSQL);
            }
            connection.query(rawSQL).then(([results, structure]) => {
                return ok({
                    data: results.length ? results[0] : null,
                    structure
                });
            }).catch(fail);
        }).catch(fail);
    }

    onQuerySetIntoTable(query, parameters) {
        query.into(this.constructor.MODEL_INFO.table);
    }

    onQuerySetTable(query, parameters) {
        query.table(this.constructor.MODEL_INFO.table);
    }

    onQueryExecutionToInsertOne(query, parameters) {
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.constructor.getConnection().then(connection => {
                if (this.debugSQL) {
                    console.log("[mysql.insert.one] " + rawSQL);
                }
                connection.query(rawSQL).then(([results]) => {
                    parameters.output = {
                        id: results.insertId
                    };
                    return ok();
                }).catch(fail);
            }).catch(fail);
        });
    }

    onSyncFileToPostOne(query, parameters) {
        return new Promise((ok, fail) => {
            if (!("stores" in this.constructor.MODEL_INFO)) {
                return ok();
            }
            const {
                table,
                stores
            } = this.constructor.MODEL_INFO;
            const storeNames = Object.keys(stores).filter(store => store in parameters.files && typeof parameters.files[store] === "object");
            if(storeNames.length === 0) {
                return ok();
            }
            const {
                id
            } = parameters.output;
            this.getOne(id).then(results => {
                const store = this.store.create();
                const { data } = results;
                let index = 0;
                const next = () => {
                    index++;
                    if(index >= storeNames.length) {
                        return ok();
                    }
                }
                storeNames.forEach(storeName => {
                    const { contents = null, extension = "txt" } = parameters.files[storeName];
                    if(contents !== null) {
                        store.writeFile(`${table}.${storeName}.${data.id}.${extension}`, contents) 
                            .then(next)
                            .catch(fail);
                    } else {
                        return next();
                    }
                });
            }).catch(fail);
        });
    }

    onQueryExecutionToUpdateOne(query, parameters) {
        return new Promise((ok, fail) => {
            const rawSQL = query.toString();
            this.constructor.getConnection().then(connection => {
                if (this.debugSQL) {
                    console.log("[mysql.update.one] " + rawSQL);
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
        });
    }

    onSyncFileToPutOne(query, parameters) {
        return new Promise((ok, fail) => {
            if (!("stores" in this.constructor.MODEL_INFO)) {
                return ok();
            }
            const {
                table,
                stores
            } = this.constructor.MODEL_INFO;
            const storeNames = Object.keys(stores).filter(store => store in parameters.files);
            if(storeNames.length === 0) {
                return ok();
            }
            const {
                id
            } = parameters.output;
            this.getOne(id).then(results => {
                const store = this.store.create();
                const { data } = results;
                let index = 0;
                const next = () => {
                    index++;
                    if(index >= storeNames.length) {
                        return ok();
                    }
                }
                storeNames.forEach(storeName => {
                    const { contents = null, extension = "txt" } = parameters.files[storeName];
                    if(contents !== null) {
                        store.updateFile(`${table}.${storeName}.${data.id}.${extension}`, contents) 
                            .then(next)
                            .catch(fail);
                    } else {
                        return next();
                    }
                });
            }).catch(fail);
        });
    }

    onQueryExecutionToDeleteOne(query, parameters) {
        const {
            ok,
            fail
        } = parameters;
        const rawSQL = query.toString();
        this.constructor.getConnection().then(connection => {
            if (this.debugSQL) {
                console.log("[mysql.delete.one] " + rawSQL);
            }
            connection.query(rawSQL).then(([results]) => {
                return ok({
                    deletedItems: results.affectedRows
                });
            }).catch(fail);
        }).catch(fail);
    }

}

module.exports = Model;