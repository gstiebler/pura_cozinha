import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';

const basePath = '/cozinha';

export default {
  homeKitchen: new Route({
    path: basePath,
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onOrdersOpen();
    },
  }),
  orders: new Route({
    path: basePath + '/orders',
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onOrdersOpen();
    },
  }),
  orderDetails: new Route({
    path: basePath + '/order_details',
    component: <OrderDetails store={store}/>,
    onParamsChange: (route, params) => {
      store.onOrderSelected(params.orderId);
    }
  }),
};
