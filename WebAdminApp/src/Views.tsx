import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Dashboard from './components/Dashboard';
import Ingredients from './components/Ingredients';
import EditIngredient from './components/EditIngredient';

const base_path = '/admin_app';

export default {
  home: new Route({
    path: base_path,
    component: <Dashboard store={store}/>
  }),
  ingredients: new Route({
    path: base_path + '/ingredients',
    component: <Ingredients store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onIngredientsPageLoad();
    },
  }),
  editIngredient: new Route({
    path: base_path + '/edit_ingredient',
    component: <EditIngredient store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onIngredientsPageLoad();
    },
  }),
};
