const express = require("express");
const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");
const {
    toSanitization,
    toIterator,
    toCamelCase,
    findInAny,
} = require(process.env.PROJECT_ROOT + "/src/utils.js");

Logger.startsClass("src/controllers/Controller");
class Controller {

    static get MODEL_CLASS() {
        throw new Error("Required static <model> property to be overriden");
    }

    static create(...args) {
        return new this(...args);
    }

    constructor(options = {}) {
        Logger.startsMethod("src/controllers/Controller@constructor");
        Object.assign(this, require(__dirname + "/traits/Controller.onMount.js"));
        Object.assign(this, require(__dirname + "/traits/Controller.onRespondJson.js"));
        Object.assign(this, require(__dirname + "/traits/Controller.onRespondSchema.js"));
        Object.assign(this, require(__dirname + "/traits/Controller.onRespondGet.js"));
        Object.assign(this, require(__dirname + "/traits/Controller.onRespondPost.js"));
        Object.assign(this, require(__dirname + "/traits/Controller.onRespondPut.js"));
        Object.assign(this, require(__dirname + "/traits/Controller.onRespondDelete.js"));
        Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
        Logger.endsMethod("src/controllers/Controller@constructor");
    }

    onError(error, request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onError");
        console.log("Responding from: onError");
        Logger.endsMethod("src/controllers/Controller@onError");
        return response.end(error.message);
    }

}
Object.assign(Controller, require(__dirname + "/traits/Controller.statics.js"));
Logger.endsClass("src/controllers/Controller");

module.exports = Controller;