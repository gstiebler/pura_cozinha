/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Menu from './src/Menu/MenuComponent';

export default class MobileApp extends Component {
  render() {
    return (
      <Menu />
    );
  }
}

AppRegistry.registerComponent('MobileApp', () => MobileApp);
