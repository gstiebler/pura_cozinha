
let _navigator = null;
let _tabComponent = null;

export function setNavigator(navigator) {
  _navigator = navigator;
}

export function setTabComponent(tabComponent) {
  _tabComponent = tabComponent;
}

export const kitchensFlowControl = {
  onKitchenSelected: (id: string) => {
    _tabComponent.setPage('food_menu');
    console.log('');
  }
}