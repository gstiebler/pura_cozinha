/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import TabsComponent from './src/components/TabsComponent';

export default class MobileApp extends Component {
  render() {
    return <TabsComponent />
  }
}

AppRegistry.registerComponent('MobileApp', () => MobileApp);
