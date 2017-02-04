import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabsComponent from './TabsComponent';
import Header from './Header';

const MainComponent = () => {
  return (
    <View style={styles.container}>
      <Header />
      <TabsComponent />
    </View>
  )
}

export default MainComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});