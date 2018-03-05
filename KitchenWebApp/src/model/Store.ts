
import { computed, observable } from 'mobx';
import { RouterStore } from 'mobx-router';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {} from '../../../common/Interfaces';

const readableStatus = new Map([
  ['PENDING', 'pendente'],
  ['DELIVERED', 'entregue'],
  ['CANCELED', 'cancelado'],
]);

export class Store {

  @observable router: RouterStore;
  @observable orders: any[];
  @observable currentOrder;

  constructor() {
    this.reset();
  }

  reset() {
    this.orders = [];
    this.currentOrder = null;
  }

  async onOrdersOpen() {
    this.orders = await ns.getOrders();
  }

  async onOrderSelected(orderId: number) {
    const order = await ns.getOrderDetails(orderId);
    order.readableStatus = readableStatus.get(order.status);
    this.currentOrder = order;
  }

}

export let store: Store = new Store();
