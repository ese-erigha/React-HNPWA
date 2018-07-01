export const LOAD_USER = '[Load] User';
export const LOAD_USER_SUCCESS = '[Load] User Success';
export const LOAD_USER_PENDING = '[Load] User Pending';
export const LOAD_USER_ERROR = '[Load] User Error';

export const loadUserAction = payload => ({ type: LOAD_USER,payload});
export const loadUserSuccessAction = payload => ({ type: LOAD_USER_SUCCESS, payload });
export const loadUserPendingAction = payload => ({ type: LOAD_USER_PENDING, payload });
export const loadUserErrorAction = payload => ({ type: LOAD_USER_ERROR, payload });