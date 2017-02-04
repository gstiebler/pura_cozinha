import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabsComponent from './TabsComponent';

const MainComponent = () => {
  return (
      <TabsComponent />
  )
}

export default MainComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff99',
    justifyContent: 'center'
  },
  text: {
    padding: 10,
    color: '#000000',
    fontSize: 20,
  }
});