
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import { 
  TfmiId,
  TPaymentOptions,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
  ISelectedMenuItemOption,
} from '../../../common/Interfaces';

export class Store {

  @observable router;
  @observable foodMenuItems: FoodMenuItem[] = [];
  @observable itemQty: Map<TfmiId, number> = new Map();
  @observable selectedOptions: ISelectedMenuItemOption[] = [];
  @observable selectedLocal: string;
  @observable localComplement: string;
  @observable selectedPaymentOption: TPaymentOptions;
  @observable telephoneNumber: string;
  @observable localComplementLabel: string = 'Apartamento';
  @observable isSnackbarOpen: boolean = false;
  @observable snackbarMsg: string = '';
  // fmi id => option key => value
  @observable selectedBoolOptions: Map<TfmiId, Map<string, boolean>> = new Map();

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
    this.selectedOptions = [];
    this.selectedBoolOptions = new Map();
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

  @computed
  get orderSummary(): IOrderSummary {
    const selectedItems = [...this.itemQty.entries()];
    const items = selectedItems.map(item => {
      const fmi = this.getFoodMenuItem(item[0]);
      const qty = item[1];
      const itemTotalPrice = fmi.price * qty;
      return {
        fmi: {
          _id: fmi._id,
          title: fmi.title,
          description: fmi.description,
          price: fmi.price,
          imgURL: fmi.imgURL,
          selectedOptions: [],
          selectedBoolOptions: [],
        },
        qty,
        itemTotalPrice,
      }
    });
    const totalAmount = items.map(i => i.itemTotalPrice).reduce((a, b) => a + b, 0);
    return { items, totalAmount };
  }

  boolOption(id: TfmiId, optionKey: string):boolean {
    const fmiBoolOptions = this.selectedBoolOptions.get(id);
    return fmiBoolOptions ? fmiBoolOptions.get(optionKey) : false;
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

  async onSendOrderRequested() {
    try {
      const request:IOrderRequest = {
        orderSummary: this.orderSummary,
        local: this.selectedLocal,
        localComplement: this.localComplement,
        paymentOption: this.selectedPaymentOption,
        telephoneNumber: this.telephoneNumber,
      };
      await ns.sendOrderRequest(request);
      this.reset();
      this.setSnackbarMsg('Pedido recebido com sucesso');
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao enviar o pedido');
    }
  }

  boolOptionSelected(id: TfmiId, optionKey: string) {
    let item = this.selectedBoolOptions.get(id) || new Map();
    item.set(optionKey, !item.get(optionKey));
    this.selectedBoolOptions.set(id, item);
  }

  onMenuItemOptionSelected(id: TfmiId, optionKey: string, optionItem: string) {
    
  }

}

export let store: Store = new Store();
