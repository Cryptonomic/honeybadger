import React, {useEffect} from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';

import MainNavigator from './navigation/MainNavigator';
import MessageModal from './components/MessageModal';
import store from './store';

export default function App() {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
    }, []);
    return (
        <Provider store={store}>
            <MenuProvider>
                <Root>
                    <MainNavigator />
                    <MessageModal />
                </Root>
            </MenuProvider>
        </Provider>
    );
}
