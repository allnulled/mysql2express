const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");
const {
    toIterator
} = require(process.env.PROJECT_ROOT + "/src/utils.js");

module.exports = {

    getLifecycleToGetAll() {
        return ["onAuthorizeGetAll", "onValidateGetAll", "onQueryGetAll", "onFormatGetAll"];
    },

    onRespondGetAll(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondGetAll");
        const parameters = Object.assign({}, ["where", "page", "quantity", "order", "fields", "search"].reduce((output, key) => {
            if (key in request.query) {
                output[key] = request.query[key];
            }
            return output;
        }, {
            where: "[]",
            page: "0",
            quantity: "20",
            order: "[]",
            fields: "[]",
            search: ""
        }), {
            scope: this,
            lifecycle: this.getLifecycleToGetAll(),
            ok: next,
            fail: this.onRespondJsonErrorFactory(500, request, response, next)
        }, {
            request,
            response,
        });
        toIterator(parameters).next();
        Logger.endsMethod("src/controllers/Controller@onRespondGetAll");
    },

    onValidateGetAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onValidateGetAll");
        try {
            parameters.where = JSON.parse(parameters.where);
            if (!Array.isArray(parameters.where)) throw parameters.where;
        } catch (error) {
            Logger.error("Error on <where>: ", {
                data: parameters.where
            });
            return parameters.fail(new Error("Invalid parameter <where>: must be a json array"));
        }
        try {
            if (parameters.page.length > 11) throw {};
            parameters.page = JSON.parse(parameters.page);
            if (parseInt(parameters.page) === NaN) throw {};
            if (parameters.page < 0) parameters.page = 0;
        } catch (error) {
            Logger.error("Error on <page>: ", {
                data: parameters.page
            });
            return parameters.fail(new Error("Invalid parameter <page>: must be a positive integer"));
        }
        try {
            if (parameters.quantity.length > ("" + this.constructor.REQUEST_MAX_QUANTITY_PER_REQUEST).length) throw {};
            parameters.quantity = JSON.parse(parameters.quantity);
            if (parseInt(parameters.quantity) === NaN) throw {};
            if (parameters.quantity <= 0) throw {};
            if (parameters.quantity > this.constructor.REQUEST_MAX_QUANTITY_PER_REQUEST) throw {};
        } catch (error) {
            Logger.error("Error on <quantity>: ", {
                data: parameters.quantity
            });
            return parameters.fail(new Error("Invalid parameter <quantity>: must be a number between 1 and " + this.constructor.REQUEST_MAX_QUANTITY_PER_REQUEST));
        }
        try {
            parameters.order = JSON.parse(parameters.order);
            if (!Array.isArray(parameters.order)) throw {};
            if (!parameters.order.reduce((out, item) => {
                    out &= Array.isArray(item) && item.length < 3;
                }, true)) throw {};
        } catch (error) {
            Logger.error("Error on <order>: ", {
                data: parameters.order
            });
            return parameters.fail(new Error("Invalid parameter <order>: must be a json array of arrays with 3 items"));
        }
        try {
            parameters.fields = JSON.parse(parameters.fields);
            if (!Array.isArray(parameters.fields)) throw {};
            if (!parameters.fields.reduce((out, item) => {
                    out &= typeof item === "string";
                }, true)) throw {};
        } catch (error) {
            Logger.error("Error on <fields>: ", {
                data: parameters.fields
            });
            return parameters.fail(new Error("Invalid parameter <fields>: must be a json array of strings"));
        }
        try {
            if (parameters.search.length > 200) throw {};
        } catch (error) {
            return parameters.fail(new Error("Invalid parameter <search>: must be less than 200 characters"));
        }
        Logger.endsMethod("src/controllers/Controller@onValidateGetAll");
        return;
    },

    onAuthorizeGetAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onAuthorizeGetAll");

        Logger.endsMethod("src/controllers/Controller@onAuthorizeGetAll");
        return;
    },

    onQueryGetAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onQueryGetAll");
        return new Promise((ok, fail) => {
            const {
                request
            } = parameters;
            this.constructor.MODEL_CLASS.create({
                controller: this
            }).getAll(parameters).then(data => {
                request.m2e.output = data;
                Logger.endsMethod("src/controllers/Controller@onQueryGetAll");
                return ok();
            }).catch(fail);
        });
    },

    onFormatGetAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onFormatGetAll");
        Logger.endsMethod("src/controllers/Controller@onFormatGetAll");
        return;
    },

    getLifecycleToGetFile() {
        return ["onAuthorizeGetFile", "onValidateGetFile", "onQueryGetFile", "onFormatGetFile"];
    },

    onRespondGetFile(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondGetFile");
        response.end("onRespondGetFile");
        Logger.endsMethod("src/controllers/Controller@onRespondGetFile");
    },

    onRespondGetOne(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondGetOne");
        response.end("get one!");
        Logger.endsMethod("src/controllers/Controller@onRespondGetOne");
    }

};