import { combineEpics } from 'redux-observable';
import {loadFeedEpic,loadItemEpic} from './feed.epics';
import {loadUserEpic} from './user.epics';

let rootEpic = combineEpics(
    loadFeedEpic,loadItemEpic,loadUserEpic
);


export default rootEpic;