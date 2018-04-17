
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {
  TfmiId,
  TPaymentOptions,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
} from '../../../common/Interfaces';
import { IKitchenModel } from  '../../../server/src/db/models/kitchen';

export class Store {

  @observable router;
  @observable foodMenuItems: FoodMenuItem[] = [];
  @observable itemQty: Map<TfmiId, number> = new Map();
  @observable selectedLocal: string;
  @observable localComplement: string;
  @observable selectedPaymentOption: TPaymentOptions;
  @observable telephoneNumber: string;
  @observable localComplementLabel: string = 'Apartamento';
  @observable isSnackbarOpen: boolean = false;
  @observable snackbarMsg: string = '';
  @observable comments: string = '';
  @observable kitchen: IKitchenModel = null;

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

  reset() {
    this.itemQty = new Map();
    this.comments = '';
  }

  getKitchenActive(): boolean
  {
    return this.kitchen.active;
  }

  getQuantityStockItemValue(_id: string): number
  {
    if(this.kitchen != null)
    {
      const stock = this.kitchen.stock;
      var result = stock.filter( obj => obj.menu_item === _id)[0];
      return result.quantity;
    }
    return -1;
  }

  async getDefaultKitchen()
  {
    this.kitchen = await ns.findKitchenById('5aa9b17fe5a77b0c7ba3145e');
    this.foodMenuItems = await ns.getItemsByKitchen(this.kitchen._id);
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

  setSnackbarMsg(msg: string) {
    this.snackbarMsg = msg;
    this.isSnackbarOpen = true;
    setTimeout(() => {
      this.isSnackbarOpen = false;
    }, 5000);
  }

  isBackButtonVisible(): string
  {
    return this.router.currentView.path === '/' ? 'none' : 'block';
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
    this.foodMenuItems = await ns.getItemsByKitchen(this.kitchen._id);
  }

  onLocalSelected(local: string) {
    this.selectedLocal = local;
    this.localComplementLabel = local === 'Piscina' ? 'Como te localizar na piscina' :
      'Apartamento';
  }

  onLocalComplementChanged(local: string) {
    this.localComplement = local;
  }

  onPaymentOptionSelected(paymentOption: TPaymentOptions) {
    this.selectedPaymentOption = paymentOption;
  }

  onTelNumberChanged(telNumber: string) {
    this.telephoneNumber = telNumber;
  }

  onCommentsChanged(comment: string) {
    this.comments = comment;
  }

  async onSendOrderRequested() {
    try {
      const request:IOrderRequest = {
        orderSummary: this.orderSummary,
        local: this.selectedLocal,
        localComplement: this.localComplement,
        paymentOption: this.selectedPaymentOption,
        telephoneNumber: this.telephoneNumber,
        comments: this.comments,
      };
      await ns.sendOrderRequest(request);
      this.reset();
      this.setSnackbarMsg('Pedido recebido com sucesso');
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao enviar o pedido');
    }
  }

}

export let store: Store = new Store();
