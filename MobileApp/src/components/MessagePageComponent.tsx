import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

interface IProps {
  message: string;
  onOkClicked: any;
}

const MessagePageComponent = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
      <Button
        onPress={props.onOkClicked}
        title='OK'
        color='#841584'
        accessibilityLabel='OK'
      />
    </View>
  );
};

export default MessagePageComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff99',
    justifyContent: 'center'
  },
  text: {
    padding: 10,
    color: '#000000',
    fontSize: 20,
    textAlign: 'center'
  }
});