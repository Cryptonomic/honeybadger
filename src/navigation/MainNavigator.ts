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
import SettingsScreen from '../screens/Settings';
import SeedPhraseScreen from '../screens/SeedPhrase';
import DelegateAddressScreen from '../screens/DelegateAddress';
import DelegateReviewScreen from '../screens/DelegateReview';
import AccountSetup from '../screens/AccountSetup';
import ResetPin from '../screens/ResetPin';

const MainNavigator = createStackNavigator(
    {
        Welcome: WelcomeScreen,
        Terms: TermsScreen,
        Loading: LoadingScreen,
        Account: AccountScreen,
        AccountSetup: AccountSetup,
        Receive: ReceiveScreen,
        SendAddress: SendAddressScreen,
        SendAmount: SendAmountScreen,
        SendReview: SendReviewScreen,
        SendFirstTime: SendFirstTimeScreen,
        Settings: SettingsScreen,
        SeedPhrase: SeedPhraseScreen,
        DelegateAddress: DelegateAddressScreen,
        DelegateReview: DelegateReviewScreen,
        ResetPin: ResetPin,
    },
    {
        headerMode: 'none',
    },
);

export default createAppContainer(MainNavigator);
