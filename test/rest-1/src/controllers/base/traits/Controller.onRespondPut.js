const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");

module.exports = {

    onRespondPutOne(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondPutOne");
        console.log("Responding from: onRespondPutOne");
        Logger.endsMethod("src/controllers/Controller@onRespondPutOne");
        response.end("onRespondPutOne");
    },
    
    onRespondPutAll(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondPutAll");
        console.log("Responding from: onRespondPutAll");
        Logger.endsMethod("src/controllers/Controller@onRespondPutAll");
        response.end("onRespondPutAll");
    }

};