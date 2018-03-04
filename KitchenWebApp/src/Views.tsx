import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Orders from './components/Orders';

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
};
