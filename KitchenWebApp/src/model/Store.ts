
import { computed, observable } from 'mobx';
import { RouterStore } from 'mobx-router';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import { TOrderStatus } from '../../../common/Interfaces';

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
    this._reset();
  }

  _reset() {
    this.orders = [];
    this.currentOrder = null;
  }

  async onOrdersOpen() {
    this.orders = await ns.getOrders();
  }

  async onOrdersByStatus(status: TOrderStatus) {
    this.orders = await ns.getOrdersByStatus(status);
  }

  async onOrderSelected(orderId: string) {
    const order = await ns.getOrderDetails(orderId);
    order.readableStatus = readableStatus.get(order.status);
    this.currentOrder = order;
  }

  async onStatusChanged(orderId: string, status: TOrderStatus) {
    await ns.changeOrderStatus(orderId, status);
  }

}

export let store: Store = new Store();
