import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

function renderRow(onItemSelected, rowData, sectionID, rowID, highlightRow) {
  return (
    <TouchableOpacity onPress={() => { onItemSelected(rowData) } }>
      <View style={styles.card}>
        <Text>{rowData.title}</Text>
        <Text>{rowData.qty}</Text>
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
    </View>
  );
}

export default Cart;

const styles = StyleSheet.create({
  card: {},
  container: {},
  header: {},
});