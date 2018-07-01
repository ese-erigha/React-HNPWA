import {
    switchMap,
    withLatestFrom,
    map,
    tap,
    catchError
} from "rxjs/operators";
import { of } from "rxjs";
import * as feedActions from '../actions/feed.actions';
import feedService from '../../shared/services/feed.service';
import feedTypeService from '../../shared/services/feed-type.service';


export const loadFeedEpic = (action$, state$) =>
    action$.ofType(feedActions.LOAD_FEEDS)
    .pipe(
        tap((action) => feedActions.loadFeedsPendingAction({
            
            currentFeed: action['payload'].type
        })),
        withLatestFrom(state$),
        map(([action, state]) => {
            
            return {
                feed: state.feedState[action['payload'].type],
                payload: action['payload']
            };
        }),
        switchMap(actionAndState => {
            
            if (!Object.keys(actionAndState.feed).length) { //If feed type data is empty

                return feedService.getFeedIds(feedTypeService.getFeedKey(actionAndState.payload.type))
                    .pipe(
                        tap((response) => {
                           
                        }),
                        map((feedIds) => {

                            return feedService.paginateFeedIds(feedIds)
                        }),
                        switchMap((feedType) => {
                            
                            return feedService.getItems(feedType[actionAndState.payload.pageNumber])
                                .pipe(
                                    map((feeds) => {

                                        return {
                                            [actionAndState.payload.type]: feedType,
                                            feeds: feeds,
                                            currentFeed: actionAndState.payload.type
                                        }
                                    })
                                );
                        })
                    );
            } else {

                return feedService.getItems(actionAndState.feed[actionAndState.payload.pageNumber])
                    .pipe(
                        map((feeds) => {

                            let feedData = actionAndState.feed;
                            feedData['pageNumber'] = actionAndState.payload.pageNumber;

                            return {
                                feeds: feeds,
                                currentFeed: actionAndState.payload.type,
                                [actionAndState.payload.type]: feedData
                            }
                        })
                    );
            }

        }),
        map((partialState) => {
                // console.log(partialState);
               return feedActions.loadFeedsSuccessAction(partialState);
        }),
        catchError(err => of (feedActions.loadFeedsErrorAction({
            feeds: []
        })))
    );



export const loadItemEpic = action$ =>
    action$.ofType(feedActions.LOAD_ITEM)
    .pipe(
        tap((action) => feedActions.loadItemPendingAction({
            story: {}
        })),
        switchMap((action) => {
            return feedService.getItem(action['payload'].id);
        }),
        switchMap((story) => {

            if (story['kids'].length) {
                return feedService.getItems(story['kids'])
                    .pipe(

                        map((comments) => {

                            story['kids'] = Object.assign([], comments);
                            return {
                                story: story
                            };
                        })
                    );
            } else {
                return of({
                    story: story
                });
            }
        }),
        map((partialState) => feedActions.loadItemSuccessAction(partialState)),
        catchError(err => of (feedActions.loadItemErrorAction(err)))
    );