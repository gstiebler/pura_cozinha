
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {} from '../../../common/Interfaces';

export class Store {

  @observable router;
  @observable orders: any[];

  constructor() {
    this.reset()
  }

  async onOrdersOpen() {
    this.orders = await ns.getOrders();
  }

  reset() {
    this.orders = [];
  }

}

export let store: Store = new Store();
