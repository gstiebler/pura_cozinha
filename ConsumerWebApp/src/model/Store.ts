
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

  @computed
  get orderSummary() {
    const selectedItems = [...this.itemQty.entries()];
    const items = selectedItems.map(item => {
      const fmi = this.getFoodMenuItem(item[0]);
      const qty = item[1];
      const itemTotalPrice = fmi.price * qty;
      return {
        fmi,
        qty,
        itemTotalPrice,
      }
    });
    const total = items.map(i => i.itemTotalPrice).reduce((a, b) => a + b, 0);
    return { items, total };
  }

  setItemQty(id: TfmiId, qty: number) {
    if (qty < 0) {
    } else if (qty === 0) {
      this.itemQty.delete(id);
    } else {
      this.itemQty.set(id, qty);
    }
  }

  onItemQtyIncreased(fmiId: TfmiId) {
    this.setItemQty(fmiId, this.getItemQty(fmiId) + 1);
  }

  onItemQtyDecreased(fmiId: TfmiId) {
    this.setItemQty(fmiId, this.getItemQty(fmiId) - 1);
  }

}

export let store: Store = new Store();
