import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import model from '../Model';

export default function Menu() {
  const foodMenu = model.getFoodMenu();
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(foodMenu);
  return <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit index.android.js
    </Text>
    <Text style={styles.instructions}>
      Double tap R on your keyboard to reload,{'\n'}
      Shake or press menu button for dev menu
    </Text>
    <ListView
      dataSource={dataSource}
      renderRow={(rowData) => <Text>{rowData.title}</Text>}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});