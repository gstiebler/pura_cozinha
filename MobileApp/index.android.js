/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import MainComponent from './out/src/components/MainComponent';

export default class MobileApp extends Component {
  render() {
    return <MainComponent />
  }
}

AppRegistry.registerComponent('MobileApp', () => MobileApp);
