const Logger = require(process.env.PROJECT_ROOT + "/src/loggers/Logger.js");
const {
    toIterator
} = require(process.env.PROJECT_ROOT + "/src/utils.js");

module.exports = {

    getLifecycleToPostOne() {
        return ["onAuthorizePostOne", "onValidatePostOne", "onQueryPostOne", "onFormatPostOne"];
    },

    onRespondPostOne(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondPostOne");
        const parameters = Object.assign({}, ["where", "page", "quantity", "order", "fields", "search"].reduce((output, key) => {
            if(key in request.query) {
                output[key] = request.query[key];
            }
            return output;
        }, {
        	/*
            where: "[]",
            page: "0",
            quantity: "20",
            order: "[]",
            fields: "[]",
            search: ""
            //*/
        }), {
            scope: this,
            lifecycle: this.getLifecycleToPostOne(),
            ok: next,
            fail: this.onRespondJsonErrorFactory(500, request, response, next)
        }, {
            request,
            response,
        });
        toIterator(parameters).next();
        Logger.endsMethod("src/controllers/Controller@onRespondPostOne");
    },
	onAuthorizePostOne(parameters) {
        Logger.startsMethod("src/controllers/Controller@onAuthorizePostOne");
        Logger.endsMethod("src/controllers/Controller@onAuthorizePostOne");

	},

	onValidatePostOne(parameters) {
        Logger.startsMethod("src/controllers/Controller@onValidatePostOne");
        Logger.endsMethod("src/controllers/Controller@onValidatePostOne");

	},

	onQueryPostOne(parameters) {
        Logger.startsMethod("src/controllers/Controller@onQueryPostOne");
        Logger.endsMethod("src/controllers/Controller@onQueryPostOne");

	},

	onFormatPostOne(parameters) {
        Logger.startsMethod("src/controllers/Controller@onFormatPostOne");
        Logger.endsMethod("src/controllers/Controller@onFormatPostOne");

	},



    getLifecycleToPostAll() {
        return ["onAuthorizePostAll", "onValidatePostAll", "onQueryPostAll", "onFormatPostAll"];
    },

    onRespondPostAll(request, response, next) {
        Logger.startsMethod("src/controllers/Controller@onRespondPostAll");
        console.log("Responding from: onRespondPostAll");
        Logger.endsMethod("src/controllers/Controller@onRespondPostAll");
        response.end("onRespondPostAll");
    },
	
	onAuthorizePostAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onAuthorizePostAll");
        Logger.endsMethod("src/controllers/Controller@onAuthorizePostAll");

	},
	
	onValidatePostAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onValidatePostAll");
        Logger.endsMethod("src/controllers/Controller@onValidatePostAll");

	},
	
	onQueryPostAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onQueryPostAll");
        Logger.endsMethod("src/controllers/Controller@onQueryPostAll");

	},
	
	onFormatPostAll(parameters) {
        Logger.startsMethod("src/controllers/Controller@onFormatPostAll");
        Logger.endsMethod("src/controllers/Controller@onFormatPostAll");

	}

};