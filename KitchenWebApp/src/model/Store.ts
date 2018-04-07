
import { computed, observable } from 'mobx';
import { RouterStore } from 'mobx-router';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import { TOrderStatus } from '../../../common/Interfaces';
import views from '../Views';
import { User, IUserModel } from  '../../../server/src/db/models/User';

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
  @observable user: IUserModel = null;

  // visual properties
  @observable isDrawerOpen = false;

  constructor() {
    this._reset();
  }

  _reset() {
    this.orders = [];
    this.currentOrder = null;
    this.user = null;
    this.isLoggedIn = false;
  }

  async _setCurrentOrder(orderId: string) {
    const order = await ns.getOrderDetails(orderId);
    order.readableStatus = readableStatus.get(order.status);
    this.currentOrder = order;
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

  async onLoginSubmit() {
    const token = this.generateRememberToken();
    this.user = await ns.findUser(this.email, this.password, token);
    if(this.user.token != undefined || this.user.token != null)
    {
      this.setLocalStorageToken(this.user.token);
    }
    if(this.user != null)
      this.isLoggedIn = true;
    else{
      this._reset();
    } 
  }

  async findUserByToken()
  {
    const token = this.getLocalStorageToken('token');
    this.user = await ns.findUserByToken(token);
    if(this.user != null)
      this.isLoggedIn = true;
    else{
      this._reset();
    } 
  }

  setLocalStorageToken(token: string)
  {
    const userToken = {
      'created_at': new Date(),
      'token': token
    }
    localStorage.setItem('token', JSON.stringify(userToken));
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

  generateRememberToken(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
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

}

export let store: Store = new Store();
