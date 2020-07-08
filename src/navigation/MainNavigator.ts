import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import WelcomeScreen from '../screens/Welcome';
import TermsScreen from '../screens/Terms';
import LoadingScreen from '../screens/Loading';
import AccountScreen from '../screens/Account';
import ReceiveScreen from '../screens/Receive';
import SendAddressScreen from '../screens/SendAddress';
import SendAmountScreen from '../screens/SendAmount';
import SendReviewScreen from '../screens/SendReview';
import SendFirstTimeScreen from '../screens/SendFirstTime';

const MainNavigator = createStackNavigator(
    {
        Welcome: WelcomeScreen,
        Terms: TermsScreen,
        Loading: LoadingScreen,
        Account: AccountScreen,
        Receive: ReceiveScreen,
        SendAddress: SendAddressScreen,
        SendAmount: SendAmountScreen,
        SendReview: SendReviewScreen,
        SendFirstTime: SendFirstTimeScreen,
    },
    {
        headerMode: 'none',
    },
);

export default createAppContainer(MainNavigator);
