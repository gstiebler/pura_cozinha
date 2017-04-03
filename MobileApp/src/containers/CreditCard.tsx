import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import CreditCardComponent from '../components/CreditCardComponent';
import { model } from '../Startup';
import { convertCCFormat } from '../Model';
import { creditCardFlowControl } from '../FlowControl';

interface IAppProps {
}

interface IAppState {
  cardValues: any;
}

export default class CreditCard extends Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      cardValues: { valid: false }
    };
  }

  componentDidMount() {
  }

  onChange(newCCInfo) {
    this.setState({ cardValues: newCCInfo });
    if (newCCInfo.valid) {
      console.log(newCCInfo.values);
    }
  }

  async onPayClicked() {
    if (this.state.cardValues.valid) {
      const ccInfo = convertCCFormat(this.state.cardValues.values);
      await model.order(ccInfo);
      creditCardFlowControl.afterPayment();
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
    );
  }
}