module.exports = {

    REQUEST_MAX_QUANTITY_PER_REQUEST: 250,

    DEFAULT_OPTIONS: {

        app: undefined,
        endpoint: undefined,

        onStartMiddleware: [],

        onSchemaMiddleware: [],
        onGetMiddleware: [],
        onGetAllMiddleware: [],
        onGetFileMiddleware: [],
        onGetFormMiddleware: [],
        onGetOneMiddleware: [],

        onPostMiddleware: [],
        onPostAllMiddleware: [],
        onPostFileMiddleware: [],
        onPostFormMiddleware: [],
        onPostOneMiddleware: [],

        onPutMiddleware: [],
        onPutAllMiddleware: [],
        onPutFileMiddleware: [],
        onPutFormMiddleware: [],
        onPutOneMiddleware: [],

        onDeleteMiddleware: [],
        onDeleteAllMiddleware: [],
        onDeleteFileMiddleware: [],
        onDeleteFormMiddleware: [],
        onDeleteOneMiddleware: [],

        onEndMiddleware: [],

    }

};