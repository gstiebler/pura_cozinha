import * as React from 'react';
import { MobxRouter, Route, RouterStore } from 'mobx-router';
import { store, Store } from './model/Store';
import FoodMenu from './components/FoodMenu';
import ItemDetail from './components/ItemDetail';
import OrderSummary from './components/OrderSummary';

export default {
  home: new Route({
    path: '/',
    component: <FoodMenu store={store}/>,
    beforeEnter: (route, params, store: Store) => {
      store.onMenuPageLoad();
    },
  }),
  itemDetail: new Route({
    path: '/item_detail',
    component: <ItemDetail store={store}/>
  }),
  orderSummary: new Route({
    path: '/order_summary',
    component: <OrderSummary store={store}/>
  }),
};
