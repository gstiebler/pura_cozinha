import React, { Component } from 'react';
import { View } from 'react-native';
import CartComponent from '../components/CartComponent';
import { model } from '../Startup';
import { cartFlowControl } from '../FlowControl';

interface IAppProps {
}

interface IAppState {
  cartItems: any[];
  totalCartValue: number;
}

export default class Cart extends Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      totalCartValue: 0.0
    };
  }

  componentDidMount() {
    this.updateState();
  }

  componentWillReceiveProps(nextProps) {
    // TODO call when the model changes too
    this.updateState();
  }

  updateState() {
    const cartItems = model.getCartItems();
    const totalCartValue = model.getTotalCartValue();
    this.setState({ cartItems, totalCartValue });
  }

  render() {
    if(!this.state.cartItems) {
      return <View />
    } else {
      return (
        <CartComponent 
          cartItems={this.state.cartItems}
          totalCartValue={this.state.totalCartValue}
          onItemSelected={(cartItem) => { cartFlowControl.onItemSelected(cartItem.id); }}
          onOrderClicked={cartFlowControl.onOrderClicked}
        />
      )
    }
  }
}