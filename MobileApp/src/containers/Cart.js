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
      const cartItems = model.getCartItems();
      this.setState({ cartItems });
  }

  onItemSelected(cartItem) {
    console.log(cartItem);
  }

  render() {
    if(!this.state.cartItems) {
      return <View />
    } else {
      return (
        <CartComponent 
          cartItems={this.state.cartItems} 
          onItemSelected={this.onItemSelected.bind(this)}
        />
      )
    }
  }
}