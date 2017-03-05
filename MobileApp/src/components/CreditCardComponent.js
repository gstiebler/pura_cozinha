import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { LiteCreditCardInput } from "react-native-credit-card-input";

const CreditCard = ({onChange, onPayClicked}) => {
  const labels = {
    number: "Nro. do cartão",
    expiry: "MM/AA",
    cvc: "CVC/CCV" 
  };
  return (
    <View>
      <Text style={styles.text} >Insira os dados do cartão de crédito</Text>
      <LiteCreditCardInput 
        onChange={onChange} 
        labels={labels}
      />      
      <Button
        onPress={onPayClicked}
        title="Pagar"
        color="#841584"
        accessibilityLabel="Pagar"
      />
    </View>
  );
}

export default CreditCard;


const styles = StyleSheet.create({
  text: {
    padding: 10
  },
});