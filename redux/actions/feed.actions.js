export const LOAD_FEEDS = '[Load] Feeds';
export const LOAD_FEEDS_SUCCESS = '[Load] Feeds Success';
export const LOAD_FEEDS_PENDING = '[Load] Feeds Pending';
export const LOAD_FEEDS_ERROR = '[Load] Feeds Error';


export const loadFeedsAction = payload => ({ type: LOAD_FEEDS,payload});
export const loadFeedsSuccessAction = payload => ({ type: LOAD_FEEDS_SUCCESS, payload });
export const loadFeedsPendingAction = payload => ({ type: LOAD_FEEDS_PENDING, payload });
export const loadFeedsErrorAction = payload => ({ type: LOAD_FEEDS_ERROR, payload });



export const LOAD_ITEM = '[Load] Item';
export const LOAD_ITEM_SUCCESS = '[Load] Item Success';
export const LOAD_ITEM_PENDING = '[Load] Item Pending';
export const LOAD_ITEM_ERROR = '[Load] Item Error';


export const loadItemAction = payload => ({ type: LOAD_ITEM,payload});
export const loadItemSuccessAction = payload => ({ type: LOAD_ITEM_SUCCESS, payload });
export const loadItemPendingAction = payload => ({ type: LOAD_ITEM_PENDING, payload });
export const loadItemErrorAction = payload => ({ type: LOAD_ITEM_ERROR, payload });

