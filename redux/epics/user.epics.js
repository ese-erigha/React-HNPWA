import {
    Observable,
    of
} from "rxjs";
import {
    switchMap,
    map,
    tap,
    catchError
} from "rxjs/operators";
import * as userActions from '../actions/user.actions';
import userService from '../../shared/services/user.service';


export const loadUserEpic = action$ =>

    action$.ofType(userActions.LOAD_USER)
    .pipe(
        tap((action) => userActions.loadUserPendingAction({
            user: {}
        })),
        switchMap((action) => {

            return userService.getUser(action['payload'].id)
                .pipe(
                    map((user) => {

                        return {
                            user: user
                        };
                    })
                );
        }),
        map((partialState) => userActions.loadUserSuccessAction(partialState)),
        catchError(err => of (userActions.loadUserErrorAction(err)))
    );