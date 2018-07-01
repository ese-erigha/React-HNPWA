import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import  rootReducer  from './reducers/index';
import rootEpic  from './epics/index';



/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/

export default function initializeStore (initialState, options) {
    const epicMiddleware = createEpicMiddleware();
    const reduxMiddleware = applyMiddleware(thunkMiddleware, epicMiddleware);
    let store =  createStore(
        rootReducer,
        initialState,
        reduxMiddleware
      );
    epicMiddleware.run(rootEpic);

    return store;
};



  


