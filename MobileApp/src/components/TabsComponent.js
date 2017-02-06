import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import FoodMenu from '../../src/containers/FoodMenu';
import Tabs from 'react-native-tabs';

export default class TabsComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FoodMenu />
        <Tabs selected="first" style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>console.log(el.props.name)}>
          <Text name="food_menu">Cardápio</Text>
          <Text name="orders">Pedidos</Text>
          <Text name="profile">Eu</Text>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});