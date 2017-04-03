import React, { Component } from 'react';
import { View } from 'react-native';
import AddressComponent from '../components/AddressComponent';
import { model } from '../Startup';
import { addressFlowControl } from '../FlowControl';

export default class Cart extends Component {
  constructor(props){
    super(props);

    this.state = {
      address: ''
    }
  }

  componentDidMount() {
    this.setState({ address: model.getAddress() });
  }

  onAddressChanged(newAddress) {
    this.setState({address: newAddress});
    model.setAddress(newAddress);
  }

  render() {
    return (
      <AddressComponent 
        address={this.state.address} 
        onAddressChanged={this.onAddressChanged.bind(this)}
        onPayClicked={addressFlowControl.onPayClicked}
      />
    )
  }
}