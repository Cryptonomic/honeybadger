import {combineReducers} from 'redux';

import app from './app/reducers';
import messages from './messages/reducers';

export default combineReducers({
    app,
    messages
});
