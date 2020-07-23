import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const middlewares = [ReduxThunk];

// Redux Debugger Plugin for Flipper
if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
}

export default createStore(rootReducer, applyMiddleware(...middlewares));
