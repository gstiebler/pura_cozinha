import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import FoodMenu from '../../src/containers/FoodMenu';
import Cart from '../../src/containers/Cart';
import Tabs from 'react-native-tabs';

export default class TabsComponent extends Component {

  constructor(props){
    super(props);
    this.state = { page:'food_menu' };
  }

  render() {
    let viewedTab = null;
    if(this.state.page == 'food_menu') {
      viewedTab = <FoodMenu navigator={this.props.navigator} />
    } else if (this.state.page == 'cart') {
      viewedTab = <Cart />
    } else if (this.state.page == 'orders') {
      viewedTab = <Text>Pedidos são mostrados aqui</Text>
    }

    return (
      <View style={styles.container}>
        { viewedTab }
        <Tabs selected={this.state.page} style={styles.tabs}
              selectedStyle={styles.selected} onSelect={el=>this.setState({page:el.props.name})}>
          <Text name="food_menu">Cardápio</Text>
          <Text name="cart">Carrinho</Text>
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
  selected: {
    color:'red'
  },
  tabs: {
    backgroundColor:'white'
  }
});