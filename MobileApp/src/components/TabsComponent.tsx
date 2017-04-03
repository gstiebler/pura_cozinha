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
import * as FlowControl from '../FlowControl';

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

  componentDidMount() {
    FlowControl.setTabComponent(this);
  }

  setPage(page: string) {
    this.setState( { page } );
  }

  render() {
    let viewedTab = null;
    console.log(this.state.page);
    if (this.state.page === 'food_menu') {
      viewedTab = <FoodMenu />
    } else if (this.state.page === 'kitchens') {
      viewedTab = <Kitchens />;
    } else if (this.state.page === 'cart') {
      viewedTab = <Cart />
    } else if (this.state.page === 'orders') {
      viewedTab = <Text>Pedidos são mostrados aqui</Text>;
    }

    return (
      <View style={styles.container}>
        {viewedTab}
        <Tabs selected={this.state.page} style={styles.tabs}
          selectedStyle={styles.selected} onSelect={el => this.setState({ page: el.props.name })}>
          <Text name="kitchens">Cozinhas</Text>
          <Text name='food_menu'>Cardápio</Text>
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