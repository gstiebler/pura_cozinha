import React, { Component } from 'react';
import { View } from 'react-native';
import CreditCardComponent from '../components/CreditCardComponent';
import model from '../Model';

export default class CreditCard extends Component {
  constructor(props){
    super(props);

    this.state = {}
  }

  componentDidMount() {
  }
  
  onChange(newCCInfo) {
    console.log(newCCInfo);
  }

  render() {
    return (
      <CreditCardComponent 
        onChange={this.onChange.bind(this)}
      />
    )
}
}