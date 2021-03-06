
import { computed, observable } from 'mobx';
import { RouterStore } from 'mobx-router';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import { TOrderStatus, IFoodMenuItem, IKitchenStockRequest} from '../../../common/Interfaces';
import views from '../Views';
import { User, IUserModel } from  '../../../server/src/db/models/User';
import { Kitchen } from  '../../../common/Interfaces';
import { IngredientType } from '../../../common/Interfaces';

export const availableStatuses = [
  ['PENDING', 'Pendente'],
  ['PREPARING', 'Em preparo'],
  ['DELIVERING', 'Em entrega'],
  ['DELIVERED', 'Entregue'],
  ['CANCELED', 'Cancelado'],
];

export const readableStatus = new Map(availableStatuses as any);

export class Store {

  @observable router: RouterStore;
  @observable orders: any[];
  @observable currentOrder;
  @observable email: string = '';
  @observable password: string = '';
  @observable isLoggedIn: boolean = true;
  @observable kitchenActive: boolean = true;
  @observable user: IUserModel = null;
  @observable kitchen: Kitchen = null;
  @observable foodMenuItems: any[] = [];
  @observable ingredientTypesStock: any[] = [];
  @observable ingredientTypes: IngredientType[] = [];
  @observable currentIngredientType: IngredientType = null;
  @observable stockQty: string = ''; 
  @observable ingredientTitle: string = ''; 
  @observable snackbarMsg: string = '';
  @observable kitchenComments: string = '';
  // visual properties
  @observable isDrawerOpen = false;
  @observable isSnackbarOpen: boolean = false;
  @observable anchorEL = null; //ingredient menu anchor to Edit stock
  @observable openDialogForm: boolean = false;
  
  constructor() {
    this._reset();
  }

  _reset() {
    this.orders = [];
    this.currentOrder = null;
    this.user = null;
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    this.anchorEL = null;
    this.openDialogForm = false;
  }



  async _setCurrentOrder(orderId: string) {
    const order = await ns.getOrderDetails(orderId);
    order.readableStatus = readableStatus.get(order.status);
    this.kitchenComments = order.kitchenComments;
    this.currentOrder = order;
  }

  async getDefaultKitchen()
  {
    this.kitchen = await ns.findKitchenById('5aa9b17fe5a77b0c7ba3145e');
    this.kitchenActive = this.kitchen.active;
  }
  async onOrdersOpen(ordersType: string) {
    const openOrderTypes:TOrderStatus[] = ['PENDING', 'PREPARING', 'DELIVERING'];
    const closedOrderTypes:TOrderStatus[] = ['DELIVERED', 'CANCELED'];
    const orderTypes = ordersType === 'OPEN' ? openOrderTypes :
                       ordersType === 'CLOSED' ? closedOrderTypes :
                       ['Error: unkonwn order type'];
    this.orders = await ns.getOrders(orderTypes);
  }

  async onOrderSelected(orderId: string) {
    await this._setCurrentOrder(orderId);
  }

  async onKitchenStatusChange()
  {
    this.kitchenActive = !this.kitchenActive;
    await ns.updateKitchenStatus(this.kitchen._id, this.kitchenActive);
    await this.getDefaultKitchen();
  }

  async onLoginSubmit() {
    this.user = await ns.findUser(this.email, this.password);
    if(this.user != null){
      this.setLocalStorageToken(this.user.token);
      this.isLoggedIn = true;
    }
    else{
      this.setSnackbarMsg("Usuário e/ou senha incorreto(s)");
      this._reset();
    } 
  }

  setLocalStorageToken(token: string) {
    const userToken = {
      'created_at': new Date(),
      'token': token
    }
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  onLogOut()
  {
    localStorage.removeItem('token');
    this._reset();
  }

  async findUserByToken()
  {
    const token = this.getLocalStorageToken('token');
    this.user = await ns.findUserByToken(token);
    if(this.user != null)
      this.isLoggedIn = true;
    else{
      this.onLogOut();
    } 
  }

  getLocalStorageToken(chave): string
  {
    var itemValue = localStorage.getItem(chave);
    if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {
      var current = JSON.parse(itemValue);
      return current.token;
    }
    return null;
  }

  emailChanged(email: string){
    this.email = email;
  }

  passwordChanged(password: string){
    this.password = password;
  }

  async onStatusChanged(status: TOrderStatus) {
    await ns.changeOrderStatus(this.currentOrder._id, status);
    await this._setCurrentOrder(this.currentOrder._id);
  }

  async onCommentsChanged(comment: string) {
    this.kitchenComments = comment;
  }

  async saveKitchenComments()
  {
    try{
      await ns.changeKitchenComments(this.currentOrder._id, this.kitchenComments);
      await this._setCurrentOrder(this.currentOrder._id);
      this.setSnackbarMsg('Comentário salvo com sucesso!');
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao salvar comentário!');
    }
  }
  
  async getItemsByKitchen()
  {
    this.foodMenuItems = await ns.getItemsByKitchen(this.kitchen._id);
  }

  async onIngredientTypesStockPage()
  {
    
    //Get ingredientTypes registered
    this.ingredientTypes = await ns.fetchIngredientTypes();

    //Get total amounts of ingredient types in stock
    this.ingredientTypesStock = await ns.fetchIngredientTypesAmount();
    
  }

  getIngredientTypeAmountInList(id: string)
  {
    return this.ingredientTypesStock.find(it => it._id == id);
  }

  setCurrentIngredientType(id: string)
  {
    this.currentIngredientType = this.ingredientTypes.find(it => it._id == id);
    this.ingredientTitle = this.currentIngredientType.title;
    this.stockQty = this.ingredientTypesStock.find(it => it._id == id).total;
  }

  onKitchenStockQtyChanged(quantity: string)
  {
    this.stockQty = quantity;
  }

  async updateIngredientTypeStock()
  {
    const kitchenStock: IKitchenStockRequest = {
      kitchen: this.kitchen._id,
      ingredientType: this.currentIngredientType._id,
      quantity: parseFloat(this.stockQty),
    };
    try{
      await ns.updateKitchenStock(kitchenStock);
      this._reset();
      await this.onIngredientTypesStockPage();
      this.setSnackbarMsg('Estoque editado com sucesso');
    }
    catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao executar esta função!');
    }
  
  }

  getQuantityStockItemValue(_id: string): number
  {
    if(this.kitchen != null)
    {
      const stock = this.kitchen.stock;
      var result = stock.find( obj => obj.menu_item === _id);
      return result.quantity;
    }
    return -1;
  }

  async updateItemAvailabilityInStock(menu_item: string)
  {
    if(this.kitchen != null)
    {
      let i = this.kitchen.stock.findIndex( obj => obj.menu_item === menu_item);
      var result = this.kitchen.stock.filter( obj => obj.menu_item === menu_item)[0];
      this.kitchen.stock[i].quantity = (result.quantity != 0) ? 0 : 1;
      try{
        const msg = await ns.updateKitchen(this.kitchen);
        const snackMsg = 'Item ' + ((result.quantity != 0) ? 'habilitado': 'desabilitado') + ' com sucesso!';
        this.setSnackbarMsg(snackMsg);
      }
      catch(error) {
        console.error(error);
        this.setSnackbarMsg('Erro ao executar esta função!');
      }
    }
  }

  async findIngredientById(id: string): Promise<IngredientType>
  {
    return await ns.findIngredientTypeById(id);
  }

  setSnackbarMsg(msg: string) {
    this.snackbarMsg = msg;
    this.isSnackbarOpen = true;
    setTimeout(() => {
      this.isSnackbarOpen = false;
    }, 5000);
  }

}

export let store: Store = new Store();
