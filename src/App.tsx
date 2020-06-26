import React from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import MainNavigator from './navigation/MainNavigator';
import store from './store';

export default function App() {
    return (
        <Provider store={store}>
            <Root>
                <MainNavigator />
            </Root>
        </Provider>
    );
}
