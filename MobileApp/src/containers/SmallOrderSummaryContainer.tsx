import React, { Component } from 'react';
import SmallOrderSummaryComponent from '../components/SmallOrderSummaryComponent';
import { model } from '../Startup';

interface IAppProps {
}

interface IAppState {
  cartItems: any[];
}

export default class SmallOrderSummary extends Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
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
    this.setState({ cartItems });
  }

  render() {
    if (false) {
      // return null;
    } else {
      return (
        <SmallOrderSummaryComponent
          cartItems={this.state.cartItems}
        />
      );
    }
  }
}