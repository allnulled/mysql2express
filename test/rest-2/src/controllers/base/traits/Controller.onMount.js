const express = require("express");
const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");
const {
    toSanitization,
    toIterator,
    toCamelCase,
    findInAny,
} = require(process.env.PROJECT_ROOT + "/src/utils.js");

module.exports = {

    onInitMiddleware(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onInitMiddleware");
        if(!("m2e" in request)) {
            request.m2e = {
                output: undefined
            };
        }
        Logger.endsMethod("src/controllers/Controller@onInitMiddleware");
        return next();
    },

    mountOn(...parameters) {
        Logger.startsMethod("src/controllers/Controller@mountOn");
        Logger.endsMethod("src/controllers/Controller@mountOn");
        return this.onMount(...parameters);
    },

    onMount(parameters = {}) {
        Logger.startsMethod("src/controllers/Controller@onMount");
        return new Promise((ok, fail) => {
            const app = parameters.app || express();
            const endpoint = toCamelCase(this.constructor.MODEL_CLASS.MODEL_INFO.table);
            const onDeleteAllMiddleware = findInAny([parameters, this], "onDeleteAllMiddleware", []);
            const onDeleteMiddleware = findInAny([parameters, this], "onDeleteMiddleware", []);
            const onDeleteOneMiddleware = findInAny([parameters, this], "onDeleteOneMiddleware", []);
            const onEndMiddleware = findInAny([parameters, this], "onEndMiddleware", []);
            const onGetAllMiddleware = findInAny([parameters, this], "onGetAllMiddleware", []);
            const onGetFileMiddleware = findInAny([parameters, this], "onGetFileMiddleware", []);
            const onGetMiddleware = findInAny([parameters, this], "onGetMiddleware", []);
            const onGetOneMiddleware = findInAny([parameters, this], "onGetOneMiddleware", []);
            const onPostAllMiddleware = findInAny([parameters, this], "onPostAllMiddleware", []);
            const onPostMiddleware = findInAny([parameters, this], "onPostMiddleware", []);
            const onPostOneMiddleware = findInAny([parameters, this], "onPostOneMiddleware", []);
            const onPutAllMiddleware = findInAny([parameters, this], "onPutAllMiddleware", []);
            const onPutMiddleware = findInAny([parameters, this], "onPutMiddleware", []);
            const onPutOneMiddleware = findInAny([parameters, this], "onPutOneMiddleware", []);
            const onSchemaMiddleware = findInAny([parameters, this], "onSchemaMiddleware", []);
            const onStartMiddleware = findInAny([parameters, this], "onStartMiddleware", []);
            const onInitMiddleware = parameters.onInitMiddleware || this.onInitMiddleware;
            const onRespondJsonSuccess = parameters.onRespondJsonSuccess || this.onRespondJsonSuccess;
            const onRespond = parameters.onRespond || this.onRespond;
            const endpointToSchema = `/${endpoint}/@schema`;
            const endpointToGetFile = `/${endpoint}/:id/:column`;
            const endpointToGetOne  = `/${endpoint}/:id`;
            const endpointToGetAll = `/${endpoint}`;
            const endpointToPostOne = `/${endpoint}/:id`;
            const endpointToPostAll = `/${endpoint}`;
            const endpointToPutOne = `/${endpoint}/:id`;
            const endpointToPutAll = `/${endpoint}`;
            const endpointToDeleteOne = `/${endpoint}/:id`;
            const endpointToDeleteAll = `/${endpoint}`;
            Logger.debug("[     schema: ] " + endpointToSchema, {icon: "  +"});
            app.get(endpointToSchema, onInitMiddleware, onStartMiddleware, onSchemaMiddleware, onEndMiddleware, this.onRespondSchema.bind(this), onRespondJsonSuccess);
            Logger.debug("[   get-file: ] " + endpointToGetFile, {icon: "  +"});
            app.get(endpointToGetFile, onInitMiddleware, onStartMiddleware, onGetMiddleware, onGetFileMiddleware, onEndMiddleware, this.onRespondGetFile.bind(this), onRespondJsonSuccess);
            Logger.debug("[    get-one: ] " + endpointToGetOne, {icon: "  +"});
            app.get(endpointToGetOne, onInitMiddleware, onStartMiddleware, onGetMiddleware, onGetOneMiddleware, onEndMiddleware, this.onRespondGetOne.bind(this), onRespondJsonSuccess);
            Logger.debug("[   post-one: ] " + endpointToPostOne, {icon: "  +"});
            app.post(endpointToPostOne, onInitMiddleware, onStartMiddleware, onPostMiddleware, onPostOneMiddleware, onEndMiddleware, this.onRespondPostOne.bind(this), onRespondJsonSuccess);
            Logger.debug("[    put-one: ] " + endpointToPutOne, {icon: "  +"});
            app.put(endpointToPutOne, onInitMiddleware, onStartMiddleware, onPutMiddleware, onPutOneMiddleware, onEndMiddleware, this.onRespondPutOne.bind(this), onRespondJsonSuccess);
            Logger.debug("[ delete-one: ] " + endpointToDeleteOne, {icon: "  +"});
            app.delete(endpointToDeleteOne, onInitMiddleware, onStartMiddleware, onDeleteMiddleware, onDeleteOneMiddleware, onEndMiddleware, this.onRespondDeleteOne.bind(this), onRespondJsonSuccess);
            Logger.debug("[    get-all: ] " + endpointToGetAll, {icon: "  +"});
            app.get(endpointToGetAll, onInitMiddleware, onStartMiddleware, onGetMiddleware, onGetAllMiddleware, onEndMiddleware, this.onRespondGetAll.bind(this), onRespondJsonSuccess);
            Logger.debug("[   post-all: ] " + endpointToPostAll, {icon: "  +"});
            app.post(endpointToPostAll, onInitMiddleware, onStartMiddleware, onPostMiddleware, onPostAllMiddleware, onEndMiddleware, this.onRespondPostAll.bind(this), onRespondJsonSuccess);
            Logger.debug("[    put-all: ] " + endpointToPutAll, {icon: "  +"});
            app.put(endpointToPutAll, onInitMiddleware, onStartMiddleware, onPutMiddleware, onPutAllMiddleware, onEndMiddleware, this.onRespondPutAll.bind(this), onRespondJsonSuccess);
            Logger.debug("[ delete-all: ] " + endpointToDeleteAll, {icon: "  +"});
            app.delete(endpointToDeleteAll, onInitMiddleware, onStartMiddleware, onDeleteMiddleware, onDeleteAllMiddleware, onEndMiddleware, this.onRespondDeleteAll.bind(this), onRespondJsonSuccess);
            Logger.endsMethod("src/controllers/Controller@onMount");
            return ok(app);
        });
    }

};