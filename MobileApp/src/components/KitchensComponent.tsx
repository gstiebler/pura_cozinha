import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { KitchenWithDist } from '../Model';

const deviceWidth = Dimensions.get('window').width;

function renderRow(onItemSelected, rowData: KitchenWithDist, sectionID, rowID, highlightRow) {
  return (
    <TouchableOpacity onPress={() => { onItemSelected(rowData); } }>
      <View style={styles.card}>
        <View style={styles.textColumn}>
          <Text style={styles.title}>{rowData.name}</Text>
          <Text style={styles.description}>Endereço: {rowData.address}</Text>
          <Text style={styles.description}>Distância: {(rowData.distMeters / 1000)}km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface IProps {
  kitchens: KitchenWithDist[];
  onItemSelected();
}

const Kitchens = (props: IProps) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(props.kitchens);
  return <View style={styles.container}>
    <Text style={styles.header}>Cardápio</Text>
    <ListView enableEmptySections={true}
      dataSource={dataSource}
      renderRow={renderRow.bind(null, props.onItemSelected)}
    />
  </View>
};

export default Kitchens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  header: {
    padding: 10,
    color: '#AF003F',
    fontSize: 20,
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  avatar: {
    padding: 10,
    width: 50,
    height: 50
  },
  title: {
    color: '#000',
    fontSize: 12
  },
  description: {
    fontSize: 10
  },
  price: {
    color: '#00AF00',
    padding: 10,
    fontSize: 10,
    width: 60,
    textAlign: 'right'
  },
  textColumn: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
});