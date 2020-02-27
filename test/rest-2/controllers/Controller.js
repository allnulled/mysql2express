class Controller {

    static get model() {
        throw new Error("Required static <model> property to be overriden");
    }

    static get DEFAULT_OPTIONS() {
        return {
            app: undefined,
            commonStartMiddleware: [],
            commonEndMiddleware: [],
            schemaMiddleware: [],
            getAllMiddleware: [],
            getOneMiddleware: [],
            postOneMiddleware: [],
            putOneMiddleware: [],
            deleteOneMiddleware: [],
        };
    }

    static create(...args) {
        return new this(...args).onCreate();
    }

    constructor(options = {}) {
        Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
    }

    onCreate() {
        this.onValidate();
        this.onMount();
    }

    onValidate() {
        if (typeof this.app !== "object") {
            throw new Error("Required <app> property to be a type of object");
        }
    }

    onMount() {
        this.app.get(this.commonStartMiddleware, this.schemaMiddleware, this.commonEndMiddleware, this.onCreateSchemaController());
        this.app.get(this.commonStartMiddleware, this.getAllMiddleware, this.commonEndMiddleware, this.onCreateGetAllController());
        this.app.get(this.commonStartMiddleware, this.getOneMiddleware, this.commonEndMiddleware, this.onCreateGetOneController());
        this.app.post(this.commonStartMiddleware, this.postOneMiddleware, this.commonEndMiddleware, this.onCreatePostOneController());
        this.app.put(this.commonStartMiddleware, this.putOneMiddleware, this.commonEndMiddleware, this.onCreatePutOneController());
        this.app.delete(this.commonStartMiddleware, this.deleteOneMiddleware, this.commonEndMiddleware, this.onCreateDeleteOneController());
    }

    onCreateSchemaController() {
        return (request, response, next) => {
            const validationError = this.onValidateSchema(request, response, next);
            if(validationError) {
                return this.onError(validationError, request, response, next);
            }
            const parameters = this.onParametrizeSchema(request, response, next);
            const onSuccess = this.onGenerateResponse(request, response, next);
            this.constructor.model.schema(parameters).then(onSuccess).catch(error => {
                return onError(error, request, response, next);
            });
            return;
        };
    }

    onCreateGetAllController() {
        return (request, response, next) => {
            const validationError = this.onValidateGetAll(request, response, next);
            if(validationError) {
                return this.onError(validationError, request, response, next);
            }
            const parameters = this.onParametrizeGetAll(request, response, next);
            const onSuccess = this.onGenerateResponse(request, response, next);
            this.constructor.model.getAll(parameters).then(onSuccess).catch(error => {
                return onError(error, request, response, next);
            });
            return;
        };

    }

    onCreateGetOneController() {
        return (request, response, next) => {
            const validationError = this.onValidateGetOne(request, response, next);
            if(validationError) {
                return this.onError(validationError, request, response, next);
            }
            const parameters = this.onParametrizeGetOne(request, response, next);
            const onSuccess = this.onGenerateResponse(request, response, next);
            this.constructor.model.getOne(parameters).then(onSuccess).catch(error => {
                return onError(error, request, response, next);
            });
            return;
        };

    }

    onCreatePostOneController() {
        return (request, response, next) => {
            const validationError = this.onValidatePostOne(request, response, next);
            if(validationError) {
                return this.onError(validationError, request, response, next);
            }
            const parameters = this.onParametrizePostOne(request, response, next);
            const onSuccess = this.onGenerateResponse(request, response, next);
            this.constructor.model.postOne(parameters).then(onSuccess).catch(error => {
                return onError(error, request, response, next);
            });
            return;
        };

    }

    onCreatePutOneController() {
        return (request, response, next) => {
            const validationError = this.onValidatePutOne(request, response, next);
            if(validationError) {
                return this.onError(validationError, request, response, next);
            }
            const parameters = this.onParametrizePutOne(request, response, next);
            const onSuccess = this.onGenerateResponse(request, response, next);
            this.constructor.model.putOne(parameters).then(onSuccess).catch(error => {
                return onError(error, request, response, next);
            });
            return;
        };

    }

    onCreateDeleteOneController() {
        return (request, response, next) => {
            const validationError = this.onValidateDeleteOne(request, response, next);
            if(validationError) {
                return this.onError(validationError, request, response, next);
            }
            const parameters = this.onParametrizeDeleteOne(request, response, next);
            const onSuccess = this.onGenerateResponse(request, response, next);
            this.constructor.model.deleteOne(parameters).then(onSuccess).catch(error => {
                return onError(error, request, response, next);
            });
            return;
        };
    }

    onValidateSchema(request, response, next) {}

    onValidateGetAll(request, response, next) {}

    onValidateGetOne(request, response, next) {}

    onValidatePostOne(request, response, next) {}

    onValidatePutOne(request, response, next) {}

    onValidateDeleteOne(request, response, next) {}

    onParametrizeSchema(request, response, next) {}

    onParametrizeGetAll(request, response, next) {
        const where = request.query("where", "");
        const page = request.query("page", 0);
        const sort = request.query("order", "asc");
        const quantity = request.query("quantity", 20);
        const fields = request.query("fields", "");
        const search = request.query("search", "");
        return {
            where,
            page,
            order,
            fields,
            quantity,
            search
        };
    }

    onParametrizeGetOne(request, response, next) {
        const id = request.query("id", undefined);
        const fields = request.query("fields", "");
        return {
            id,
            fields,
        };
    }

    onParametrizePostOne(request, response, next) {
        const item = request.query("item", 0);
        const fields = request.query("fields", 0);
        return {
            item,
            fields,
        };
    }

    onParametrizePutOne(request, response, next) {
        const id = request.query("id", 0);
        const item = request.query("item", 0);
        const fields = request.query("fields", 0);
        return {
            id,
            item,
            fields,
        };
    }

    onParametrizeDeleteOne(request, response, next) {
        const id = request.query("id", 0);
        return {
            id,
        };
    }

    onGenerateResponse(request, response, next) {
        return (data) => response.send({data});
    }

    onError(error, request, response, next) {
        return response.send(error.message);
    }

}

module.exports = Controller;