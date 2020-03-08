const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");

module.exports = {

    onRespondDeleteOne(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondDeleteOne");
        console.log("Responding from: onRespondDeleteOne");
        Logger.endsMethod("src/controllers/Controller@onRespondDeleteOne");
        response.end("onRespondDeleteOne");
    },
    
    onRespondDeleteAll(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondDeleteAll");
        console.log("Responding from: onRespondDeleteAll");
        Logger.endsMethod("src/controllers/Controller@onRespondDeleteAll");
        response.end("onRespondDeleteAll");
    }

};