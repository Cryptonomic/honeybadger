import {combineReducers} from 'redux';

import app from './app/reducers';
import messages from './messages/reducers';
import beacon from './beacon/reducers';

export default combineReducers({
    app,
    messages,
    beacon,
});
