import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pura Cozinha</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff99',
    justifyContent: 'center',
    height: 35
  },
  text: {
    padding: 10,
    color: '#000000',
    fontSize: 20,
    textAlign: 'center'
  }
});