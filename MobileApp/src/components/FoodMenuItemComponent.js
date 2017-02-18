import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { formatMoney } from '../utils/StringUtils'

const MenuItem = ({menuItem, onBackClicked}) => {
  return (
    <View>
      <Text>{menuItem.title}</Text>
        <Button
            onPress={onBackClicked}
            title="Voltar"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
    </View>  
  );
}

export default MenuItem;

const styles = StyleSheet.create({
  
});