
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
  @observable isDrawerOpen = false;

  constructor() {
    
  }

}

export let store: Store = new Store();
