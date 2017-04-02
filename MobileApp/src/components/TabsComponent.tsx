import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import FoodMenu from '../containers/FoodMenu';
import Kitchens from '../containers/KitchensContainer';
import Cart from '../containers/Cart';
import Tabs from 'react-native-tabs';

interface IAppProps {
  navigator: any;
}

interface IAppState {
  page: string;
}

export default class TabsComponent extends Component<IAppProps, IAppState> {

  constructor(props) {
    super(props);
    this.state = {
      page: 'kitchens'
    };
  }

  render() {
    let viewedTab = null;
    console.log(this.state.page);
    if (this.state.page === 'food_menu') {
      viewedTab = <FoodMenu navigator={this.props.navigator} />
    } else if (this.state.page === 'kitchens') {
      viewedTab = <Kitchens navigator={this.props.navigator} />;
    } else if (this.state.page === 'cart') {
      viewedTab = <Cart navigator={this.props.navigator} />
    } else if (this.state.page === 'orders') {
      viewedTab = <Text>Pedidos são mostrados aqui</Text>;
    }

    return (
      <View style={styles.container}>
        {viewedTab}
        <Tabs selected={this.state.page} style={styles.tabs}
          selectedStyle={styles.selected} onSelect={el => this.setState({ page: el.props.name })}>
          <Text name="kitchens">Cozinhas</Text>
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
    color: 'red'
  },
  tabs: {
    backgroundColor: 'white'
  }
});