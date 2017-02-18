import React, { Component } from 'react';
import { View } from 'react-native';
import CartComponent from '../components/CartComponent';
import model from '../Model';

export default class Cart extends Component {
  constructor(props){
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.updateState();
  }

  componentWillReceiveProps(nextProps) {
    // TODO call when the model changes too
    this.updateState();
  }

  updateState(props) {
    const cartItems = model.getCartItems();
    this.setState({ cartItems });
  }

  onItemSelected(cartItem) {
    this.props.navigator.push({id: 'menu_item', menuItemId: cartItem.id});
  }

  onOrderClicked() {
    this.props.navigator.push({id: 'address'});
  }

  render() {
    if(!this.state.cartItems) {
      return <View />
    } else {
      return (
        <CartComponent 
          cartItems={this.state.cartItems} 
          onItemSelected={this.onItemSelected.bind(this)}
          onOrderClicked={this.onOrderClicked.bind(this)}
        />
      )
    }
  }
}