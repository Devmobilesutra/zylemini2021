/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
//import aa from './Src/Screens/Shops/'
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen' 
import createFirst from './Src/Screens/CreateNewOrder/CreateNewOrderFirst'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'   
import TabBarReports from './Src/Screens/Reports/ReportsNav'
console.disableYellowBox = true;
//SplashScreen.hide()
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
//AppRegistry.registerComponent(appName, () => App);
