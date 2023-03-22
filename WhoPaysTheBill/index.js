/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { MyProvider } from './src/context';
import React from 'react';
//import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Toast from 'react-native-toast-message';

const provider = () => (
    <MyProvider>
        <App/>
        <Toast ref={(ref) => Toast.setRef(ref)} />
    </MyProvider>
)

AppRegistry.registerComponent(appName, () => provider);
