import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import InputNumber from 'rc-input-number'

const MenuItem = (props) => {
  return (
    <View>
      <Text>{props.menuItem.title}</Text>
      <InputNumber 
        defaultValue={props.initialValue}
        styles={{}}
        min={0}
        onChange={props.onValueChange}
      />
      <Button
        onPress={props.onBackClicked}
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