import React from 'react';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';

import store from './stores';
import App from './App';
import {name as appName} from './app.json';

const AppWrapper = () =>
{
    return (
        <Provider store={store}>
            <App></App>
        </Provider>);
}

AppRegistry.registerComponent(appName, () => AppWrapper);
