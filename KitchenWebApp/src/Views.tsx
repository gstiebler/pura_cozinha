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
      store.onOrdersOpen('OPEN');
    },
  }),
  orders: new Route({
    path: basePath + '/orders/:type',
    component: <Orders store={store}/>,
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
};
