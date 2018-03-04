
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {} from '../../../common/Interfaces';

export class Store {

  @observable router;
  @observable orders: any[];
  @observable currentOrder;

  constructor() {
    this.reset()
  }

  reset() {
    this.orders = [];
    this.currentOrder = null;
  }

  async onOrdersOpen() {
    this.orders = await ns.getOrders();
  }

  async onOrderSelected(orderId: number) {
    this.currentOrder = await ns.getOrderDetails(orderId);
  }

}

export let store: Store = new Store();
