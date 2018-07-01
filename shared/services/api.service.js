import {
    throwError,
    from
} from "rxjs";
import {
    catchError,
    retry
} from "rxjs/operators";
import httpService from './http.service';
let apiBaseUrl = "https://hacker-news.firebaseio.com/v0";

let apiService = {

    handleError: (error) => {
        return throwError(error);
    },

    getFeed: (feed) => {
        let url = `${apiBaseUrl}/${feed}.json`;
        return from(httpService.get(url)).pipe(catchError(apiService.handleError));
    },
    getItem: (itemId) => {
        let url = `${apiBaseUrl}/item/${itemId}.json`;
        return from(httpService.get(url)).pipe(catchError(apiService.handleError));
    },
    getUser: (userId) => {
        return from(httpService.get(`${apiBaseUrl}/user/${userId}.json`)).pipe(catchError(apiService.handleError));
    }
};

export default apiService;