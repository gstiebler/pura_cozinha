import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';
import Login from './components/Login';

const basePath = '/cozinha';

export default {
  home: new Route({
    path: basePath,
    component: <Login store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      console.log("entering ");
    },
  }),
  homeKitchen: new Route({
    path: basePath + '/home',
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onOrdersOpen('OPEN');
    },
  }),
  orders: new Route({
    path: basePath + '/orders/:type',
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      console.log("store log " + store.user);
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
  })
};