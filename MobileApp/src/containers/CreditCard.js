import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import CreditCardComponent from '../components/CreditCardComponent';
import model from '../Model';

export default class CreditCard extends Component {
  constructor(props){
    super(props);

    this.state = {
      cardValues: { valid: false }
    }
  }

  componentDidMount() {
  }
  
  onChange(newCCInfo) {
    this.setState({ cardValues: newCCInfo });
    if(newCCInfo.valid) {
      console.log(newCCInfo.values);
    }
  }

  onPayClicked() {
    if(this.state.cardValues.valid) {
      model.pay(this.state.cardValues.values);
    } else {
      Alert.alert(
        'Alerta',
        'Cartão inválido',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <CreditCardComponent 
        onChange={this.onChange.bind(this)}
        onPayClicked={this.onPayClicked.bind(this)}
      />
    )
}
}