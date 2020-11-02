/**
 * @format
 */
import './shim';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

console.disableYellowBox = true; // hide warnings

AppRegistry.registerComponent(appName, () => App);
