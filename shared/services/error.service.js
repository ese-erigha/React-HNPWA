let errorService = {

    createFromJSON: (obj) => {
        return JSON.stringify(obj);
    },

    getErrorCode: (obj) => {
        return obj['statusCode'];
    },

    parseToJSON: (err) => {
        return JSON.parse(err.message);
    }
};

export default errorService;