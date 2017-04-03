import React, { Component } from 'react';
import { View } from 'react-native';
import CartComponent from '../components/CartComponent';
import { model } from '../Startup';
import { cartFlowControl } from '../FlowControl';

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
    const totalCartValue = model.getTotalCartValue();
    this.setState({ cartItems, totalCartValue });
  }

  onItemSelected(cartItem) {
    cartFlowControl.onItemSelected(cartItem.id);
  }

  onOrderClicked() {
    cartFlowControl.onOrderClicked();
  }

  render() {
    if(!this.state.cartItems) {
      return <View />
    } else {
      return (
        <CartComponent 
          cartItems={this.state.cartItems} 
          totalCartValue={this.state.totalCartValue}
          onItemSelected={this.onItemSelected.bind(this)}
          onOrderClicked={this.onOrderClicked.bind(this)}
        />
      )
    }
  }
}