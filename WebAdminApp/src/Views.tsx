import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import Dashboard from './components/Dashboard';


export default {
  home: new Route({
    path: '/',
    component: <Dashboard store={store}/>
  }),
};
