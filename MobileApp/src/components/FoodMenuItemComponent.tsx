import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform
} from 'react-native';

import InputNumber from 'rc-input-number'

interface IAppProps {
  menuItem: any;
  initialValue: any;
  onValueChange();
  onBackClicked();
};

const MenuItem = (props: IAppProps) => {
  return (
    <View>
      <View style={styles.row} >
        <Text>{props.menuItem.title}</Text>
        <InputNumber 
          styles={inputNumberStyles}
          defaultValue={props.initialValue}
          styles={{}}
          min={0}
          onChange={props.onValueChange}
          style={{ backgroundColor: 'white', paddingHorizontal: 10 }}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
        />
      </View>
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
  row: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },  
});

const inputNumberStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#222',
  },
  stepWrap: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  stepText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#999',
    backgroundColor: 'transparent',
  },
  stepDisabled: {
    borderColor: '#d9d9d9',
    backgroundColor: 'rgba(239, 239, 239, 0.72)',
  },
  disabledStepTextColor: {
    color: '#ccc',
  },
  highlightStepTextColor: {
    color: '#2DB7F5',
  },
  highlightStepBorderColor: {
    borderColor: '#2DB7F5',
  },
});

