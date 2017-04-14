import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Header from './Header';
import FoodMenuItem from '../containers/FoodMenuItem';
import Address from '../containers/Address';
import CreditCard from '../containers/CreditCard';
import Kitchens from '../containers/KitchensContainer';
import FoodMenu from '../containers/FoodMenu';
import Cart from '../containers/Cart';
import * as FlowControl from '../FlowControl';

function router(route, navigator) {
  FlowControl.setNavigator(navigator);
   if (route.id === 'kitchens') {
      return <Kitchens />;
  } else if (route.id === 'menu_item') {
    return <FoodMenuItem menuItemId={route.menuItemId} />;
  } else if (route.id === 'food_menu') {
      return <FoodMenu />;
  } else if (route.id  === 'address') {
    return <Address />;
  } else if (route.id  === 'cart') {
    return <Cart />;
  } else if (route.id  === 'credit_card') {
    return <CreditCard />;
  } else {
    console.error(`Route not found on navigator: ${route.id}`);
    return <Text>Erro!</Text>;
  }
}

const MainComponent = () => {

  return (
    <Navigator
        initialRoute={{ id: 'kitchens' }}
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