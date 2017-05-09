import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

interface IProps {
}

const OrderSummary = (props: IProps) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(props.kitchens);
  return <View style={styles.container}>
    <Text style={styles.header}>Teste!</Text>
  </View>
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
});