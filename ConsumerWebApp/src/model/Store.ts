
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
  Kitchen,
  IPaymentRequest,
} from '../../../common/Interfaces';
import axios from 'axios';
import * as pagSeguroErros from '../../../server/src/lib/PagSeguroErrors';
import * as pagSeguroValidator from '../../../server/src/lib/validation/PagSeguroValidator';
import * as empty from '../../../server/src/lib/validation/isEmpty';
import views from '../Views';

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
  @observable cardNumber: string = "";
  @observable cvv: string = "";
  @observable senderName: string = "";
  @observable expirationDate: string = "";
  @observable senderCpf: string = "";
  @observable senderAreaCode: string = "";
  @observable senderPhone: string = "";
  @observable senderEmail: string = "";
  @observable senderBirthday: string = "";
  @observable shippingAddressDistrict: string = "";
  @observable shippingAddressPostalCode: string = "";
  @observable shippingAddressState: string = "";
  @observable creditCardHolderName: string = "";
  @observable creditCardHolderCPF: string = "";
  @observable creditCardHolderBirthDate: string = "";
  @observable creditCardHolderAreaCode: string = "";
  @observable creditCardHolderPhone: string = "";
  @observable sendOrderButtonTxt: string = "Enviar Pedido";
  @observable senderHash: string = "";
  @observable isCardHolder: boolean = true;
  @observable paymentItems: ISelectedMenuItemOption[] = [];
  @observable usePreviousPayment: boolean = false;
  @observable showPaymentErrors: boolean = false;
  @observable paymentErrors: any = {};


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
    this.usePreviousPayment = false;
    this.cardNumber = '';
    this.resetPaymentInfo();
  }

  resetPaymentInfo() {
     this.cardNumber = "";
     this.cvv= "";
     this.senderName= "";
     this.expirationDate= "";
     this.senderCpf = "";
     this.senderAreaCode = "";
     this.senderPhone = "";
     this.senderEmail = "";
     this.senderBirthday = "";
     this.shippingAddressDistrict = "";
     this.shippingAddressPostalCode = "";
     this.shippingAddressState = "";
     this.creditCardHolderName = "";
     this.creditCardHolderCPF = "";
     this.creditCardHolderBirthDate = "";
     this.creditCardHolderAreaCode = "";
     this.creditCardHolderPhone  = "";
     this.sendOrderButtonTxt = "Enviar Pedido";
     this.senderHash = "";
     this.isCardHolder = true;
     this.paymentItems = [];
     this.usePreviousPayment = false;
     this.showPaymentErrors = false;
     this.paymentErrors = {};
  }

  //Credit card change functions
  onCardNumberChanged(number: string) {
    this.cardNumber = number;
  }
  onCVVChanged(cvv: string) {
    this.cvv = cvv;
  }
  onExpirationDateChanged(date: string) {
    this.expirationDate = date;
  }

  onSenderNameChanged(name: string) {
    this.senderName = name;
  }

  onSenderBirthdayChanged(name: string) {
    this.senderBirthday = name;
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

  onCardNameChanged(name: string) {
    this.creditCardHolderName = name;
  }
  
  onCardCpfChanged(cpf: string) {
    this.creditCardHolderCPF = cpf;
  }
  onCardAreaCodeChanged(area: string) {
    this.creditCardHolderAreaCode = area;
  }

  onCardPhoneChanged(phone: string) {
    this.creditCardHolderPhone = phone;
  }

  onCardBirthdayChanged(email: string) {
    this.creditCardHolderBirthDate = email;
  }

  toggleIsCardHolderOwner() {
    this.isCardHolder = !this.isCardHolder;
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
    this.paymentItems = this.selectedFMIsAndOptions.slice(0);
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
      let request:IOrderRequest = {
        orderSummary: this.orderSummary,
        local: this.selectedLocal,
        localComplement: this.localComplement,
        paymentOption: 'Cartão',
        telephoneNumber: this.telephoneNumber,
        comments: this.comments,
        kitchenComments: null,
      };

      if(this.usePreviousPayment)
      {
        const retrievedObject = localStorage.getItem('orderRequest');
        const lastOrder =  JSON.parse(retrievedObject);
        request = lastOrder;
        request.orderSummary = this.orderSummary;
        await ns.sendOrderRequest(request);
        this.reset();
      }
      else
      {
        await ns.sendOrderRequest(request);
        localStorage.setItem('orderRequest', JSON.stringify(request));  
        this.reset();
      }
      // this.reset();
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
    this.senderHash = senderHash;
    console.log('items '+this.selectedFMIsAndOptions);
    const items = this.selectedFMIsAndOptions.map(item => {
      const selectedFmi = this.foodMenuItems.find(fmi => fmi._id === item._id);
      return {
        itemId: selectedFmi._id,
        itemDescription: selectedFmi.title,
        itemAmount: Number(selectedFmi.price).toFixed(2) + "",
        itemQuantity: item.qty,
      };
    });

    const senderFullPhone = this.senderPhone;
    const cardFullPhone = this.creditCardHolderAreaCode;
    const phone = this.senderPhone.split(' ');
    this.senderAreaCode = phone[0];
    this.senderPhone = phone[1];

    const phoneCard = this.creditCardHolderPhone.split(' ');
    this.creditCardHolderAreaCode = phoneCard[0];
    this.creditCardHolderPhone = phoneCard[1];
    

    let request: IPaymentRequest = {
      items: items,
      senderName: this.senderName,
      senderCPF: this.senderCpf,
      senderAreaCode: this.senderAreaCode,
      senderPhone: this.senderPhone,
      senderEmail: this.senderEmail,
      senderHash: this.senderHash,
      shippingAddressStreet: this.selectedLocal,
      shippingAddressNumber: '1384',
      shippingAddressComplement: this.localComplement,
      shippingAddressDistrict: 'Jardim Paulistano',
      shippingAddressPostalCode: '01452002',
      shippingAddressCity: 'Sao Paulo',
      shippingAddressState: 'SP',
      creditCardToken: '',
      installmentValue: Number(this.orderSummary.totalAmount).toFixed(2) + "",
      creditCardHolderName: (this.isCardHolder) ? this.senderName : this.creditCardHolderName,
      creditCardHolderCPF: (this.isCardHolder) ? this.senderCpf : this.creditCardHolderCPF,
      creditCardHolderBirthDate: (this.isCardHolder) ? this.senderBirthday: this.creditCardHolderBirthDate,
      creditCardHolderAreaCode: (this.isCardHolder) ? this.senderAreaCode : this.creditCardHolderAreaCode,
      creditCardHolderPhone: (this.isCardHolder) ? this.senderPhone : this.creditCardHolderPhone
    };
    
    this.senderPhone =  senderFullPhone ;
    this.creditCardHolderAreaCode = cardFullPhone;
    if(!this.usePreviousPayment)
    {
      const frontErrors = pagSeguroValidator.validatePaymentInput(request, {cardNumber: this.cardNumber, cvv: this.cvv, expirationDate: this.expirationDate});
      this.setPaymentErrors(JSON.stringify(frontErrors));
    }

    if(!this.showPaymentErrors)
    {
      if(this.usePreviousPayment)
      {
        const retrievedObject = localStorage.getItem('paymentInfo');
        const lastPayment =  JSON.parse(retrievedObject);
        request = lastPayment;
        request.items = items;
        request.installmentValue = Number(this.orderSummary.totalAmount).toFixed(2) + "";
        request.senderHash = this.senderHash;
        await ns.checkoutPayment(request);
        await this.onSendOrderRequested();
      }
      else{
        /** Input examples
          cardNumber: '4111111111111111',
          cvv: '123',
          expirationMonth: 12,
          expirationYear: 2030,
        */
        const dates = this.expirationDate.split('/');
        const expirationMonth = parseInt(dates[0]);
        const expirationYear = parseInt(dates[1]);
        
        
        window.PagSeguroDirectPayment.createCardToken({
          cardNumber: this.cardNumber,
          cvv: this.cvv,
          expirationMonth: expirationMonth,
          expirationYear: expirationYear,
          success: async (response) => {
            request.creditCardToken = response.card.token;;
            const checkoutResponse = await ns.checkoutPayment(request);
            this.setPaymentErrors(checkoutResponse);
            if(!this.showPaymentErrors)
            {
              await this.onSendOrderRequested();
              localStorage.setItem('paymentInfo', JSON.stringify(request));
              localStorage.setItem('cardNumber', this.cardNumber);
              this.router.goTo('/', {}, store);
            }
          },
          error: (response) => {
            this.setPaymentErrors(pagSeguroErros.mapPagseguroBadRequestForCardToken(response.errors));
          },
          complete: (response) => {
            console.log('complete process');
          }
        });
      }
    }
  }


  setPaymentErrors(errors: any)
  {
    if(!empty.isEmptyErrors(JSON.parse(errors)))
    {
      this.paymentErrors = JSON.parse(errors);
      if(!this.paymentErrors.hasOwnProperty('msg'))
        this.showPaymentErrors = true;
    }
  }


  hasPreviousPaymentInfo(): boolean
  {
    const retrievedObject = localStorage.getItem('paymentInfo');
    const lastPayment =  JSON.parse(retrievedObject);
    if(retrievedObject !== null)
    {
      let cardNumber = localStorage.getItem('cardNumber');
      cardNumber =  cardNumber.replace(/.(?=.{4})/g, 'x');
      this.cardNumber = cardNumber;
      this.creditCardHolderName = lastPayment.creditCardHolderName;
      return true;
    }
      
    return false;
  }

  @computed get isEmptyOrder(): boolean
  {
    if(empty.isEmpty(this.selectedLocal) || empty.isEmpty(this.localComplement) || empty.isEmpty(this.telephoneNumber))
      return true;
    return false;
  }

}


export let store: Store = new Store();
