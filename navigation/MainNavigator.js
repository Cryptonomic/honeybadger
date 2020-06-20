import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import WelcomeScreen from '../screens/Welcome/Welcome';
import LoadingScreen from '../screens/Loading/Loading';
import AccountScreen from '../screens/Account/Account';

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
