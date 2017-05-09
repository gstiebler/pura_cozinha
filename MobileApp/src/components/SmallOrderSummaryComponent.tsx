import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

interface IProps {
  cartItems: any[];
}

const OrderSummary = (props: IProps) => {
  const cartItems = props.cartItems.map((item, index) => {
    return <Text key={index}>{item.title}: {item.qty}</Text>;
  });
  return <View style={styles.container}>
    {cartItems}
  </View>;
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4'
  },
});