import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const menu = [
  {
    title: 'Sanduiche de frango',
    description: 'Muito gostoso, feito com frango desfiado'
  },
  {
    title: 'Sanduiche de mignon',
    description: 'Feito com o melhor file mignon da cidade, bem passado'
  },
  {
    title: 'Acai',
    description: 'Acao batido com banana e morango, vem cheiao'
  },
];

export default function Menu() {
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