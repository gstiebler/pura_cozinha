
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {} from '../../../common/Interfaces';

export class Store {

  @observable router;
  @observable orders: any[];

  constructor() {
  }

  async onOrdersOpen() {
    this.orders = await ns.getOrders();
  }

}

export let store: Store = new Store();
