import React, { Component } from 'react';
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
import model from '../Model';
import { formatMoney } from '../utils/StringUtils'

const deviceWidth = Dimensions.get('window').width;

function renderRow(rowData, sectionID, rowID, highlightRow) {
  return (
    <TouchableOpacity onPress={(rowId) => { console.log(rowId) }}>
      <View style={styles.card}>
        <Image 
          style={styles.avatar}
          source={require('../../assets/sandwich.jpg')} 
        />
        <View style={styles.textColumn}>
          <Text style={styles.title}>{rowData.title}</Text>
          <Text style={styles.description}>{rowData.description}</Text>
        </View>
        <Text style={styles.price}>R$ {formatMoney(rowData.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Menu() {
  const foodMenu = model.getFoodMenu();
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(foodMenu);
  return <View style={styles.container}>
    <Text style={styles.header}>Cardápio</Text>
    <ListView
      dataSource={dataSource}
      renderRow={renderRow}
    />
  </View>
}

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