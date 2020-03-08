const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");

module.exports = {

    onRespondSchema(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondSchema");
        request.m2e.output = this.constructor.MODEL_CLASS.create().schema();
        Logger.endsMethod("src/controllers/Controller@onRespondSchema");
        return next();
    }

};