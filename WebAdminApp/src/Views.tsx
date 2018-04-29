import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Dashboard from './components/Dashboard';
import Ingredients from './components/Ingredients';



export default {
  home: new Route({
    path: '/',
    component: <Dashboard store={store}/>
  }),
  ingredients: new Route({
    path: '/ingredients',
    component: <Ingredients store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onIngredientsPageLoad();
    },
  }),
};
