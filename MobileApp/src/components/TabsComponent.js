import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import FoodMenu from '../../src/containers/FoodMenu';
import Tabs from 'react-native-tabs';

export default class TabsComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FoodMenu />
        <Tabs selected="first" style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>console.log(el.props.name)}>
          <Text name="first">First</Text>
          <Text name="second">Second</Text>
          <Text name="third">Third</Text>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});