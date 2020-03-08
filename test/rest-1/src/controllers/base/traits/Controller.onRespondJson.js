const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");

module.exports = {

    onRespondJsonSuccess(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondJsonSuccess");
        response.json(request.m2e.output);
        Logger.endsMethod("src/controllers/Controller@onRespondJsonSuccess");
    },

    onRespondJsonError(request, response, next, error, errorNum) {
        Logger.startsMethod("src/controllers/Controller@onRespondJsonError");
        response.status(errorNum).json(error);
        Logger.endsMethod("src/controllers/Controller@onRespondJsonError");
    },

    onRespondJsonErrorFactory(errorNum, request, response, next, error = false) {
        Logger.startsMethod("src/controllers/Controller@onRespondJsonErrorFactory");
        if(error) {
            Logger.endsMethod("src/controllers/Controller@onRespondJsonErrorFactory");
            return this.onRespondJsonError(request, response, next, error, errorNum);
        }
        Logger.endsMethod("src/controllers/Controller@onRespondJsonErrorFactory");
        return (error) => {
            Logger.startsFunction("src/controllers/Controller@onRespondJsonErrorFactory@errorHandler");
            this.onRespondJsonError(request, response, next, error, errorNum);
            Logger.endsFunction("src/controllers/Controller@onRespondJsonErrorFactory@errorHandler");
        }
    }

};