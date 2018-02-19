import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Orders from './components/Orders';

export default {
  home: new Route({
    path: '/',
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onOrdersOpen();
    },
  }),
  homeKitchen: new Route({
    path: '/cozinha',
    component: <Orders store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onOrdersOpen();
    },
  }),
};
