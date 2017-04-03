
let _navigator = null;
let _tabComponent = null;

export function setNavigator(navigator) {
  _navigator = navigator;
}

export function setTabComponent(tabComponent) {
  _tabComponent = tabComponent;
}

/** Flow controls */

export const kitchensFlowControl = {
  onKitchenSelected: (id: string) => {
    _tabComponent.setPage('food_menu');
  }
};

export const foodMenuListFlowControl = {
  onFoodSelected: (id: string) => {
    _navigator.push({id: 'menu_item', menuItemId: id });
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