
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
  @observable itemQty: Map<TfmiId, number> = new Map();

  getFoodMenuItem(id: TfmiId): FoodMenuItem {
    return this.foodMenuItems.find(fmi => fmi._id === id);
  }

  async onMenuPageLoad() {
    this.foodMenuItems = await ns.fetchFoodMenu();
  }

  getItemQty(id: TfmiId): number {
    return this.itemQty.has(id) ? this.itemQty.get(id) : 0;
  }

  onItemQtyIncreased(fmiId: TfmiId) {
    this.itemQty.set(fmiId, this.getItemQty(fmiId) + 1);
  }

  onItemQtyDecreased(fmiId: TfmiId) {
    const currentQty = this.getItemQty(fmiId);
    if (currentQty === 0) { return; }
    this.itemQty.set(fmiId, currentQty - 1);
  }

}

export let store: Store = new Store();
