import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import WelcomeScreen from '../screens/Welcome';
import LoadingScreen from '../screens/Loading';
import AccountScreen from '../screens/Account';

const MainNavigator = createStackNavigator(
    {
        Welcome: WelcomeScreen,
        Loading: LoadingScreen,
        Account: AccountScreen,
    },
    {
        headerMode: 'none',
    },
);

export default createAppContainer(MainNavigator);
