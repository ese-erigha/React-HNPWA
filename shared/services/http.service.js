import * as axios from 'axios';
import errorService from './error.service';
import notificationService from './notification.service';
const isOnline = require('is-online');

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
        retry = 3,
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

                        //Handle Authentication issues
                        //Please reject errors with reject(....)

                    } else if (error.response.status === 400) {

                        //Handle Bad Request Error such as validation errors
                        //Please reject errors with reject(....)

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

                            isOnline().then((isInternetEnabled) => {

                                if (!isInternetEnabled) {

                                    notificationService.dispatchError(getErrorMessage(900));

                                } else {

                                    // Handle Http Error (error.status === 403, 404...)
                                    notificationService.dispatchError(getErrorMessage(error.response.status));
                                }

                                reject(new Error(errorService.createFromJSON(getErrorMessage(error.response.status))));
                            });
  
                        }
                    }

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    isOnline().then((isInternetEnabled) => {

                        if (!isInternetEnabled) {

                            notificationService.dispatchError(getErrorMessage(900));
                            reject(new Error(errorService.createFromJSON(getErrorMessage(900))));
                        } else {

                            // Handle Http Error (error.status === 403, 404...)
                            notificationService.dispatchError(getErrorMessage(408));
                            reject(new Error(errorService.createFromJSON(getErrorMessage(408))));
                        }

                        
                    });
                    

                } else {

                    // Something happened in setting up the request that triggered an Error
                    notificationService.dispatchError(getErrorMessage(700));
                    reject(new Error(errorService.createFromJSON(getErrorMessage(700))));
                }
            };

            function getErrorMessage(statusCode) {

                let responseStates = {
                    0: "Please check your internet connection",
                    404: "Endpoint does not exist",
                    400: "Bad request from server",
                    401: "Token has expired",
                    403: "You do not have the permission to access this resource",
                    408: "The request timed out",
                    500: "A server error occurred while fetching data",
                    700: "An unknown error has occurred",
                    900: "Please check your internet connection"
                };

                let message = {

                    statusCode: statusCode,
                    title: 'Oops',
                    text: responseStates[statusCode] || responseStates[700],
                    type: 'error'

                };

                return message;
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