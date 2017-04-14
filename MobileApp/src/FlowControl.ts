import { BackAndroid } from 'react-native';

let _navigator = null;

export function setNavigator(navigator) {
  _navigator = navigator;
}


/** Flow controls */

export const kitchensFlowControl = {
  onKitchenSelected: (id: string) => {
    _navigator.push({id: 'food_menu' });
  }
};

export const foodMenuListFlowControl = {
  onFoodSelected: (id: string) => {
    _navigator.push({id: 'menu_item', menuItemId: id });
  },
  onMakeOrder: () => {
    _navigator.push({id: 'address' });
  },
};

export const foodMenuItemFlowControl = {
  onBackClicked: () => {
    _navigator.pop();
  }
};

export const cartFlowControl = {
  onItemSelected: (id: string) => {
    _navigator.push({id: 'menu_item', menuItemId: id});
  },
  onOrderClicked: () => {
    _navigator.push({id: 'address'});
  },
};

export const addressFlowControl = {
  onPayClicked: () => {
    _navigator.push({id: 'credit_card'});
  }
};

export const creditCardFlowControl = {
  afterPayment: () => {
    _navigator.push({id: 'kitchens'});
  }
};

BackAndroid.addEventListener('hardwareBackPress', function() {
  _navigator.pop();
  return true;
});