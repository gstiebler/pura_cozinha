
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';

type TfmiId = string;

export interface FoodMenuItem {
  _id?: TfmiId;
  title: string;
  description: string;
  price: number;
  imgURL: string;
}

export class Store {

  @observable router;
  @observable foodMenuItems: FoodMenuItem[] = [];
  @observable itemQty: Map<TfmiId, number>;

  getFoodMenuItem(id: TfmiId): FoodMenuItem {
    return this.foodMenuItems.find(fmi => fmi._id === id);
  }

  async onMenuPageLoad() {
    this.foodMenuItems = await ns.fetchFoodMenu();
  }

  onItemQtyChanged(fmiId: TfmiId, qty: number) {
    this.itemQty.set(fmiId, qty);
  }

}

export let store: Store = new Store();
