import 'react-native-gesture-handler';

// Polyfill of uuid crypto.getRandomValues for RN
// Doc: https://github.com/LinusU/react-native-get-random-values
import 'react-native-get-random-values';

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
