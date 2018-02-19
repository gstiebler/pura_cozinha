
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {} from '../../../common/Interfaces';

export class Store {

  @observable router;
  @observable orders;

  constructor() {
  }

  onOrdersOpen() {
    
  }

}

export let store: Store = new Store();
