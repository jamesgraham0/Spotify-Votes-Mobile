/**
 * Main entry point of the application
 * @format
 */

import {AppRegistry} from 'react-native';
import Landing from './client/src/Landing';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Landing);
