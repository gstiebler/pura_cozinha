import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Button
} from 'react-native';
import { formatMoney } from '../utils/StringUtils'

function renderRow(onItemSelected, rowData, sectionID, rowID, highlightRow) {
  return (
    <TouchableOpacity onPress={() => { onItemSelected(rowData) } }>
      <View style={styles.row}>
        <Text>{rowData.title}: </Text>
        <Text style={styles.qty}>{rowData.qty}</Text>
      </View>
    </TouchableOpacity>
  );
}

const Cart = (props) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(props.cartItems);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Itens do carrinho</Text>
      <ListView enableEmptySections={true}
        dataSource={dataSource}
        renderRow={renderRow.bind(null, props.onItemSelected)}
      />
      <Text style={styles.total}>Total: R$ {formatMoney(props.totalCartValue)}</Text>
      <Button
        onPress={props.onOrderClicked}
        title="Fazer pedido"
        color="#841584"
        accessibilityLabel="Fazer pedido"
      />
    </View>
  );
}

export default Cart;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },  
  container: {},
  header: {
    padding: 5,
    fontWeight: 'bold'
  },
  qty: {
    marginLeft: 10,
  },
  total: {
    padding: 10,
    fontWeight: 'bold'
  }
});