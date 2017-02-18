import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Header from './Header';
import TabsComponent from './TabsComponent';
import FoodMenuItem from '../containers/FoodMenuItem';

function router(route, navigator) {
  if(route.id === 'tabs') {
    return <TabsComponent navigator={navigator} />
  } else {
    return <FoodMenuItem 
      navigator={navigator}
      menuItemId={route.menuItemId} 
    />
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