import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import TabsComponent from './TabsComponent';
import Header from './Header';

function router(route, navigator) {
  if(route.id === 'tabs') {
    return <TabsComponent navigator={navigator} />
  } else {
    console.log(route.menu_item_id);
    return <Text>Outra tela do navegador</Text>
  }
}

const MainComponent = () => {

  return (
    <Navigator
        initialRoute={{ id: 'tabs' }}
        renderScene={(route, navigator) => 
          <View style={styles.container}>
            <Header/>
            { router(route, navigator) }
          </View>
        }
    />
  )
}

export default MainComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});