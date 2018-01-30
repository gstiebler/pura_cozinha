
import { computed, observable } from 'mobx';
import * as Network from './Network';
import * as _ from 'lodash';

export interface FoodMenuItem {
  _id?: string;
  title: string;
  description: string;
  price: number;
}

interface ICartItem extends FoodMenuItem {
  qty: number;
}

export class Store {

  @observable foodMenuItems: FoodMenuItem[];

  async onMenuPageLoad() {
    this.foodMenuItems = await Network.fetchFoodMenu();
  }

}

export let store = new Store();
