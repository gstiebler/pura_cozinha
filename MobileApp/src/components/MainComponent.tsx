import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components';

import Header from './Header';
import FoodMenuItem from '../containers/FoodMenuItem';
import Address from '../containers/Address';
import Kitchens from '../containers/KitchensContainer';
import FoodMenu from '../containers/FoodMenu';
import Cart from '../containers/Cart';
import FinalOkPage from '../containers/FinalOkPage';
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
  } else if (route.id  === 'final_ok_page') {
    return <FinalOkPage />;
  } else {
    console.error(`Route not found on navigator: ${route.id}`);
    return <Text>Erro!</Text>;
  }
}

const MainComponent = () => {

  return (
    <Navigator
        initialRoute={{ id: FlowControl.getInitialRouteId() }}
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