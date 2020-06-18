import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import WelcomeScreen from '../screens/Welcome';
import LoadingScreen from '../screens/Loading';
import AccountScreen from '../screens/Account';
import ReceiveScreen from '../screens/Receive';
import SendScreen from '../screens/Send';

const MainNavigator = createStackNavigator(
    {
        Welcome: WelcomeScreen,
        Loading: LoadingScreen,
        Account: AccountScreen,
        Receive: ReceiveScreen,
        Send: SendScreen,
    },
    {
        headerMode: 'none',
    },
);

export default createAppContainer(MainNavigator);
