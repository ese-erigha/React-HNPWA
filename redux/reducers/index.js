import {
    combineReducers
} from 'redux';
import feedReducer from './feed.reducer';
import userReducer from './user.reducer';

let rootReducer = combineReducers({
    userState: userReducer,
    feedState: feedReducer,
});
export default rootReducer;