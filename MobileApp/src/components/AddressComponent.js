import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';


const Address = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Insira o endereço:</Text>
      <TextInput
        style={styles.input}
        onChangeText={props.onAddressChanged}
        value={props.address}
      />
      <Button
        onPress={props.onPayClicked}
        title="Pagar"
        color="#841584"
        accessibilityLabel="Pagar"
      />
    </View>
  );
}

export default Address;

const styles = StyleSheet.create({
  input: {height: 40, borderColor: 'gray', borderWidth: 1}
});