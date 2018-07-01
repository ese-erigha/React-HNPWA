import {
    forkJoin,
    Observable
} from 'rxjs';
import apiService from './api.service';
import helperService from './helper.service';

let feedService = {

    getItem: (id) => {
        return apiService.getItem(id);
    },
    getItems: (itemIds) => {

        const calls = [];
        itemIds.forEach(id => calls.push(apiService.getItem(id)));
        return forkJoin(calls);
    },
    getFeedIds: (feed) => {
        return apiService.getFeed(feed);
    },
    paginateFeedIds: (feedIds, pageNumber = 1, pageSize = 15) => {
        return helperService.paginate(feedIds, pageNumber, pageSize);
    }
};

export default feedService;