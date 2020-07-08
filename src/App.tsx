import React, {useEffect} from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';

import MainNavigator from './navigation/MainNavigator';
import store from './store';

export default function App() {
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    return (
        <Provider store={store}>
            <MenuProvider>
                <Root>
                    <MainNavigator />
                </Root>
            </MenuProvider>
        </Provider>
    );
}
