
import { computed, observable } from 'mobx';
import { RouterStore } from 'mobx-router';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import { TOrderStatus } from '../../../common/Interfaces';

export const availableStatuses = [
  ['PENDING', 'Pendente'],
  ['PREPARING', 'Em preparo'],
  ['DELIVERING', 'Em entrega'],
  ['DELIVERED', 'Entregue'],
  ['CANCELED', 'Cancelado'],
];

export const readableStatus = new Map(availableStatuses as any);

export class Store {

  @observable router: RouterStore;
  @observable orders: any[];
  @observable currentOrder;

  // visual properties
  @observable isDrawerOpen = false;

  constructor() {
    this._reset();
  }

  _reset() {
    this.orders = [];
    this.currentOrder = null;
  }

  async _setCurrentOrder(orderId: string) {
    const order = await ns.getOrderDetails(orderId);
    order.readableStatus = readableStatus.get(order.status);
    this.currentOrder = order;
  }

  async onOrdersOpen() {
    this.orders = await ns.getOrders();
  }

  async onOrdersByStatus(status: TOrderStatus) {
    this.orders = await ns.getOrdersByStatus(status);
  }

  async onOrderSelected(orderId: string) {
    await this._setCurrentOrder(orderId);
  }

  async onStatusChanged(status: TOrderStatus) {
    await ns.changeOrderStatus(this.currentOrder._id, status);
    await this._setCurrentOrder(this.currentOrder._id);
  }

}

export let store: Store = new Store();
