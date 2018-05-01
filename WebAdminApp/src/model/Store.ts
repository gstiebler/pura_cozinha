
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
  @observable openDialogForm: boolean = false;

  constructor() {
    
  }

  async onIngredientsPageLoad()
  {
    this.ingredients = await ns.fetchIngredients();
  }

  async findUnitById(id: string)
  {
    const unit = await ns.findUnitById(id);
    if (!!unit)
      return unit.title;
    return null;
  }



}

export let store: Store = new Store();
