import * as React from 'react';
import { Route } from 'mobx-router';
import { store, Store } from './model/Store';
import FoodMenu from './components/FoodMenu';
import ItemDetail from './components/ItemDetail';
import OrderSummary from './components/OrderSummary';
import AddressPayment from './components/AddressPayment';
import CardPaymentForm from './components/CardPaymentForm';

export default {
  home: new Route({
    path: '/',
    component: <FoodMenu store={store}/>,
    beforeEnter: async (route, params, store: Store) => {
      await store.onMenuPageLoad();
    },
  }),
  itemDetail: new Route({
    path: '/item_detail',
    component: <ItemDetail store={store}/>,
    onEnter: (route, params, store: Store) => {
      store.onFmiSelected(params.id);
    },
    onExit: () => {
      store.onFmiPageClosed();
    },
  }),
  orderSummary: new Route({
    path: '/order_summary',
    component: <OrderSummary store={store}/>
  }),
  addressPayment: new Route({
    path: '/address_payment',
    component: <AddressPayment store={store}/>
  }),
  cardPayment: new Route({
    path: '/card_payment',
    component: <CardPaymentForm store={store}/>
  }),
};
