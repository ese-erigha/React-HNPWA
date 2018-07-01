import * as userActions from '../actions/user.actions';
import userState from '../states/user.state';

const userReducer = (state = userState, action)=> {

    // Section 3
    switch(action.type) {

        case userActions.LOAD_USER:
            return {...state, loading: true};

        case userActions.LOAD_USER_PENDING:
            return {...state, loading: true, ...action.payload};

        case userActions.LOAD_USER_SUCCESS:
            return {...state, loading: false, ...action.payload}

        case userActions.LOAD_USER_ERROR:
            return {...state, loading: false, user:{}}

        default:
            return state;
    }
};

export default userReducer;