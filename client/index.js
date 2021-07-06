/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './main.js';
import {name as appName} from './app.json';
import 'babel-polyfill';

AppRegistry.registerComponent(appName, () => Main);
