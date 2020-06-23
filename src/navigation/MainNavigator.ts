import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import WelcomeScreen from '../screens/Welcome';
import LoadingScreen from '../screens/Loading';
import AccountScreen from '../screens/Account';
import ReceiveScreen from '../screens/Receive';
import SendAddressScreen from '../screens/SendAddress';
import SendSendAmountScreen from '../screens/SendAmount';
import SendFirstTimeScreen from '../screens/SendFirstTime';

const MainNavigator = createStackNavigator(
    {
        Welcome: WelcomeScreen,
        Loading: LoadingScreen,
        Account: AccountScreen,
        Receive: ReceiveScreen,
        SendAddress: SendAddressScreen,
        SendAmount: SendSendAmountScreen,
        SendFirstTime: SendFirstTimeScreen,
    },
    {
        headerMode: 'none',
    },
);

export default createAppContainer(MainNavigator);