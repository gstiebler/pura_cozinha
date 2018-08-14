
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {
  TfmiId,
  TPaymentOptions,
  IFoodMenuItem,
  IOrderSummary,
  IOrderRequest,
  ISelectedMenuItemOption,
  ISelectedFoodMenuItem,
  TOptionGroupKey,
  Kitchen
} from '../../../common/Interfaces';
import axios from 'axios';

const MAIN_KITCHEN_ID = '5aa9b17fe5a77b0c7ba3145e';


declare global {
  interface Window { PagSeguroDirectPayment: any; }
}

export class Store {

  @observable router;
  @observable foodMenuItems: IFoodMenuItem[] = [];
  @observable selectedFMIsAndOptions: ISelectedMenuItemOption[] = [];
  @observable selectedLocal: string;
  @observable localComplement: string;
  @observable selectedPaymentOption: TPaymentOptions;
  @observable telephoneNumber: string;
  @observable localComplementLabel: string = 'Apartamento';
  @observable isSnackbarOpen: boolean = false;
  @observable snackbarMsg: string = '';
  @observable comments: string = '';
  @observable kitchen: Kitchen = null;

  //Card payment info
  @observable senderName: string = "";
  @observable senderCpf: string = "";
  @observable senderAreaCode: string = "";
  @observable senderPhone: string = "";
  @observable senderEmail: string = "";
  @observable shippingAddressDistrict: string = "";
  @observable shippingAddressPostalCode: string = "";
  @observable shippingAddressState: string = "";
  @observable creditCardHolderName: string = "";
  @observable creditCardHolderCPF: string = "";
  @observable creditCardHolderBirthDate: string = "";
  @observable creditCardHolderAreaCode: string = "";
  @observable sendOrderButtonTxt: string = "Enviar Pedido";


  lastItemIndex: number;

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
    this.comments = '';
    this.selectedFMIsAndOptions = [];
  }

  //Credit card change functions
  onSenderNameChanged(name: string) {
    this.senderName = name;
  }
  
  onSenderCpfChanged(cpf: string) {
    this.senderCpf = cpf;
  }
  onSenderAreaCodeChanged(area: string) {
    this.senderAreaCode = area;
  }

  onSenderPhoneChanged(phone: string) {
    this.senderPhone = phone;
  }

  onSenderEmailChanged(email: string) {
    this.senderEmail = email;
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

  async onMenuPageLoad()
  {
    await this.getKitchen();
    await this.getFoodMenuItems();
    // await this.pagSeguroTransaction();
  }

  onFmiSelected(id: TfmiId) {
    this.selectedFMIsAndOptions.push({
      _id: id,
      qty: 0,
      boolOptions: new Set(),
      multipleOptions: new Map(),
    });
    this.lastItemIndex = this.selectedFMIsAndOptions.length - 1;
  }

  onFmiPageClosed() {
    if (this.selectedFMIsAndOptions[this.lastItemIndex].qty === 0) {
      this.selectedFMIsAndOptions.pop();
    }
  }

  async getKitchen()
  {
    this.kitchen = await ns.findKitchenById(MAIN_KITCHEN_ID);
  }

  async getFoodMenuItems()
  {
    this.foodMenuItems = await ns.getItemsByKitchen(this.kitchen._id);
  }

  getFoodMenuItem(index: number): IFoodMenuItem {
    const id = this.selectedFMIsAndOptions[index]._id;
    return this.foodMenuItems.find(fmi => fmi._id === id);
  }

  getItemQty(index: number): number {
    return this.selectedFMIsAndOptions[index].qty;
  }

  setItemQty(index: number, qty: number) {
    if (qty < 0) {
      return; 
    }
    this.selectedFMIsAndOptions[index].qty = qty;
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
    const items = this.selectedFMIsAndOptions.map(selectedFMIAndOptions => {
      const selectedFmi = this.foodMenuItems.find(fmi => fmi._id === selectedFMIAndOptions._id);
      const selectedBoolOptions = [...selectedFMIAndOptions.boolOptions].map(key => {
        const boolOption = selectedFmi.boolOptions.find(bo => bo.key === key);
        return {
          key,
          price: boolOption.price,
          label: boolOption.label,
        }
      });
      // sum the values for all selected bool options
      const boolOptionsPrice = selectedBoolOptions.reduce((sum, selectedBoolOption) => sum + selectedBoolOption.price, 0.0);

      const selectedMultipleOptionsMap = selectedFMIAndOptions.multipleOptions;
      const selectedOptions = [...selectedMultipleOptionsMap].map(([key, value]) => {
        const multipleOptionGroup = selectedFmi.options.find(optGroup => optGroup.key === key);
        const selectedOption = multipleOptionGroup.optionItems.find(opt => opt.key === value);
        return {
          key: key,
          value: value,
          label: selectedOption.label,
          price: selectedOption.price,
        };
      });
      const multipleOptionsPrice = selectedOptions.reduce((sum, selOpt) => sum + selOpt.price, 0.0);

      const mainItemPrice = selectedFmi.price;
      const fmi:ISelectedFoodMenuItem = {
        _id: selectedFmi._id,
        title: selectedFmi.title,
        description: selectedFmi.description,
        price: selectedFmi.price,
        imgURL: selectedFmi.imgURL,
        selectedOptions,
        selectedBoolOptions,
      }
      const qty = selectedFMIAndOptions.qty;
      const orderRequest = {
        fmi,
        qty,
        itemTotalPrice: (mainItemPrice + boolOptionsPrice + multipleOptionsPrice) * qty,
      }
      return orderRequest;
    });
    const totalAmount = items.map(i => i.itemTotalPrice).reduce((a, b) => a + b, 0);
    return { items, totalAmount };
  }

  getBoolOption(index: number, optionKey: string):boolean {
    return this.selectedFMIsAndOptions[index].boolOptions.has(optionKey);
  }

  getMultipleOption(index: number, optionKey: string):string {
    return this.selectedFMIsAndOptions[index].multipleOptions.get(optionKey);
  }

  onItemQtyIncreased(index: number) {
    this.setItemQty(index, this.getItemQty(index) + 1);
  }

  onItemQtyDecreased(index: number) {
    this.setItemQty(index, this.getItemQty(index) - 1);
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
    if(paymentOption == "Cartão"){
      this.sendOrderButtonTxt = "Continuar Pagamento";
    }
    else{
      this.sendOrderButtonTxt = "Enviar Pedido";
    }
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
        kitchenComments: null,
      };
      await ns.sendOrderRequest(request);
      this.reset();
      this.setSnackbarMsg('Pedido recebido com sucesso');
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao enviar o pedido');
    }
  }

  onBoolOptionSelected(index: number, optionKey: string) {
    let boolOptions = this.selectedFMIsAndOptions[index].boolOptions;
    // if "item" has optionKey, the option is selected
    if (boolOptions.has(optionKey)) {
      boolOptions.delete(optionKey);
    } else {
      boolOptions.add(optionKey);
    }
  }

  onMenuItemOptionSelected(index: number, optionKey: string, optionItem: string) {
    this.selectedFMIsAndOptions[index].multipleOptions.set(optionKey, optionItem);
  }



  async pagSeguroTransaction()
  {
    const sessionId = await ns.getPaymentSessionId();
    
    window.PagSeguroDirectPayment.setSessionId(sessionId);
    const senderHash = window.PagSeguroDirectPayment.getSenderHash();
    
    await window.PagSeguroDirectPayment.getInstallments({
      amount: '24300.00',
      brand: 'visa',
      // maxInstallmentNoInterest: 0,
      success: async function (response){
        console.log('installments ' + response.toSource());
      },
      error: function (response){
        console.log('deu erro ' + response.toSource());
      },
      complete: function (response){
        console.log('meh');
      }
    });

    let cardToken = '';
    await window.PagSeguroDirectPayment.createCardToken({
      cardNumber: '4111111111111111',
      cvv: '123',
      expirationMonth: 12,
      expirationYear: 2030,
      success: async function (response){
        cardToken = response.card.token;
        console.log('token ' + cardToken);
        await ns.checkoutPayment(cardToken, senderHash);
      },
      error: function (response){
        console.log('deu erro ' + response.toSource());
      },
      complete: function (response){
        console.log('meh');
      }
    });

    

  }

}

export let store: Store = new Store();
