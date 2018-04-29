
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
import { Ingredient } from '../../../server/src/db/models/Ingredient';
export class Store {

  @observable router;
  @observable isDrawerOpen = false;
  @observable ingredients: Ingredient[] = [];

  constructor() {
    
  }

  async onIngredientsPageLoad()
  {
    console.log(await ns.fetchIngredients());
    this.ingredients = await ns.fetchIngredients();
  }

  async findUnitById()
  {
    
  }

}

export let store: Store = new Store();
