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
import Address from '../containers/Address';
import CreditCard from '../containers/CreditCard';
import Kitchens from '../containers/KitchensContainer';

function router(route, navigator) {
  if(route.id === 'tabs') {
    return <TabsComponent navigator={navigator} />
  } else if (route.id === 'menu_item') {
    return <FoodMenuItem 
      navigator={navigator}
      menuItemId={route.menuItemId}
    />
  } else if (route.id  === 'address') {
    return <Address navigator={navigator} />
  } else if (route.id  === 'credit_card') {
    return <CreditCard navigator={navigator} />
  } else {
    return <Text>Erro!</Text>
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