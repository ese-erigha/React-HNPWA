import * as axios from 'axios';
import errorService from './error.service';

let httpService = {

    requestHandler: async (options) => {

        let response = {};

        try {

            response = await httpService.intercept({
                options
            });
            return response;

        } catch (err) {
            //check for auth error
            response = errorService.parseToJSON(err);
            if (errorService.getErrorCode(response) === 401) {

                //Perform JWT process
                try {

                    response = await httpService.intercept({
                        options
                    });

                    //Perform original request again
                    response = await httpService.intercept(options);
                    return response;

                } catch (err) {
                    throw err;
                }
            } else {
                throw err;
            }
        }
    },
    intercept: ({
        options,
        retry = 2,
        delay = 200
    }) => {

        options['timeout'] = options['timeout'] || 120000;
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        let newHeaders = Object.assign({}, options.headers, headers);
        options = Object.assign({}, options, {
            headers: newHeaders
        });
        return new Promise((resolve, reject) => {


            function request(options) {

                return axios(options)
                    .then(success)
                    .catch(failure)
            };

            function success(response) {
                resolve(response.data);
            };

            function failure(error) {
                let err = {};

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //console.log(error.response.status);

                    if (error.response.status === 401) {
                        err = handleError(error.response.status);
                        reject(new Error(errorService.createFromJSON(err)));

                    } else if (error.response.status === 400) {

                        let errorObject = {};

                        if (error.response.data) {

                            errorObject = {
                                type: "validation",
                                message: error.response.data,
                                status: error.response.status
                            };

                        } else {
                            errorObject = handleError(error.response.status);
                        }
                        reject(new Error(errorService.createFromJSON(errorObject)));

                    } else {

                        //Retry request
                        --retry;
                        if (retry > 0) {
                            setTimeout(function () {
                                httpService.intercept({
                                    options,
                                    retry: retry
                                })
                            }, delay);
                        } else {

                            //reject error  when retry attempts has been exhausted
                            err = handleError(error.response.status);
                            reject(new Error(errorService.createFromJSON(err)));
                        }
                    }

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    err = handleError(408);
                    reject(new Error(errorService.createFromJSON(err)));

                } else {
                    // Something happened in setting up the request that triggered an Error
                    err = handleError(700);
                    reject(new Error(errorService.createFromJSON(err)));
                }
            };

            function handleError(statusCode) {

                let responseStates = {
                    404: 'API endpoint does not exist',
                    400: 'Invalid username and password',
                    401: 'Token has expired',
                    408: 'The request timed out',
                    500: 'A server error occurred while fetching data',
                    700: 'An unknown error has occurred'
                };

                return {
                    status: statusCode,
                    message: responseStates[statusCode],
                    type: "generic"
                };
            };

            request(options);
        });
    },
    get: (url, options = {
        headers: {}
    }) => {

        options = Object.assign({}, options, {
            url: url,
            method: 'get'
        });
        return httpService.requestHandler(options);
    }
}

export default httpService;