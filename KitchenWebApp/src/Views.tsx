import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';
import Login from './components/Login';
import AvailableMenuItems from './components/AvailableMenuItems';
import IngredientTypesStock from './components/IngredientTypesStock';

const basePath = '/cozinha';

export default {
  home: new Route({
    path: basePath,
    component: <Login store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      
    },
  }),
  homeKitchen: new Route({
    path: basePath + '/home',
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onOrdersOpen('OPEN');
    },
  }),
  availableMenuItems: new Route({
    path: basePath + '/menu_items',
    component: <AvailableMenuItems store={store}/>,
  }),
  orders: new Route({
    path: basePath + '/orders/:type',
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      
    },
    onEnter: (route, params, store: Store, queryParams) => {
      
      store.onOrdersOpen(params.type);
    },
    onParamsChange: (route, params, store: Store, queryParams) => {
      store.onOrdersOpen(params.type);
    },
  }),
  orderDetails: new Route({
    path: basePath + '/order_details/:order_id',
    component: <OrderDetails store={store}/>,
    onParamsChange: (route, params) => {
      store.onOrderSelected(params.order_id);
    }
  }),
  ingredientTypesStock: new Route({
    path: basePath + '/ingredient_types',
    component: <IngredientTypesStock store={store}/>,
  }),
};