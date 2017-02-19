import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

const CreditCard = ({onChange}) => {
  return (
    <View>
      <Text>Insira os dados do cartão de crédito</Text>
      <CreditCardInput onChange={onChange} />
    </View>
  );
}

export default CreditCard;