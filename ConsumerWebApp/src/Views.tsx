import * as React from 'react';
import { MobxRouter, Route, RouterStore } from 'mobx-router';
import { store, Store } from './model/Store';
import FoodMenu from './components/FoodMenu';

export default {
  home: new Route({
    path: '/',
    component: <FoodMenu store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onMenuPageLoad();
    },
  }),
};
