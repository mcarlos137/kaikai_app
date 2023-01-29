/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { decode, encode } from "base-64";
import './ignoreWarnings'

if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

AppRegistry.registerComponent(appName, () => App);
