import * as feedActions from '../actions/feed.actions';
import feedState from '../states/feed.state';

//Update the application state based on the given action.
const feedReducer = (state = feedState, action) => {

    switch (action.type) {

        case feedActions.LOAD_FEEDS:
            return {...state, loading: true};

        case feedActions.LOAD_FEEDS_PENDING:
            return {...state, loading: true, ...action.payload};

        case feedActions.LOAD_FEEDS_SUCCESS:
            return {...state, loading: false, ...action.payload};

        case feedActions.LOAD_FEEDS_ERROR:
            return {...state, loading: false, ...action.payload};

        case feedActions.LOAD_ITEM:
             return {...state, loading: true};
        
        case feedActions.LOAD_ITEM_PENDING:
             return {...state, loading: true,...action.payload};

        case feedActions.LOAD_ITEM_SUCCESS:
             return {...state, loading: false, ...action.payload};

        case feedActions.LOAD_ITEM_ERROR:
             return {...state, loading: false, story: {}};

        default:
            return state;
    };
};

export default feedReducer;