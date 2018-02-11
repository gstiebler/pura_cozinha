
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
} from '../../../common/Interfaces';

export class Store {

  @observable router;
  @observable foodMenuItems: FoodMenuItem[] = [];
  @observable itemQty: Map<TfmiId, number> = new Map();
  @observable selectedLocal: string;
  @observable selectedPaymentOption: string;
  @observable telephoneNumber: string;

  locationOptions: string[];
  paymentOptions: string[];

  constructor() {
    this.locationOptions = [
      'Stella Vita',
      'Bella Vita',
      'Piscina',
    ];

    this.paymentOptions = [
      'Dinheiro',
      'Cartão',
      'Abraços',
    ];
  }

  getFoodMenuItem(id: TfmiId): FoodMenuItem {
    return this.foodMenuItems.find(fmi => fmi._id === id);
  }

  getItemQty(id: TfmiId): number {
    return this.itemQty.has(id) ? this.itemQty.get(id) : 0;
  }

  setItemQty(id: TfmiId, qty: number) {
    if (qty < 0) {
    } else if (qty === 0) {
      this.itemQty.delete(id);
    } else {
      this.itemQty.set(id, qty);
    }
  }

  @computed
  get orderSummary(): IOrderSummary {
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
    const totalAmount = items.map(i => i.itemTotalPrice).reduce((a, b) => a + b, 0);
    return { items, totalAmount };
  }

  onItemQtyIncreased(fmiId: TfmiId) {
    this.setItemQty(fmiId, this.getItemQty(fmiId) + 1);
  }

  onItemQtyDecreased(fmiId: TfmiId) {
    this.setItemQty(fmiId, this.getItemQty(fmiId) - 1);
  }

  async onMenuPageLoad() {
    this.foodMenuItems = await ns.fetchFoodMenu();
  }

  onLocalSelected(local: string) {
    this.selectedLocal = local;
  }

  onPaymentOptionSelected(paymentOption: string) {
    this.selectedPaymentOption = paymentOption;
  }
  
  onTelNumberChanged(telNumber: string) {
    this.telephoneNumber = telNumber;
  }

  async onSendOrderRequested() {
    const request:IOrderRequest = {
      orderSummary: this.orderSummary,
      local: this.selectedLocal,
      paymentOption: this.selectedPaymentOption,
      telephoneNumber: this.telephoneNumber,
    };
    await ns.sendOrderRequest(request);
  }

}

export let store: Store = new Store();
