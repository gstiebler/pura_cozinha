import React, { Component } from 'react';
import { View } from 'react-native';
import AddressComponent from '../components/AddressComponent';
import model from '../Model';

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

  onPayClicked() {
    this.props.navigator.push({id: 'credit_card'});
  }

  render() {
    return (
      <AddressComponent 
        address={this.state.address} 
        onAddressChanged={this.onAddressChanged.bind(this)}
        onPayClicked={this.onPayClicked.bind(this)}
      />
    )
  }
}