
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
import { Unit } from '../../../server/src/db/models/Unit';
export class Store {

  @observable router;
  @observable isDrawerOpen = false;
  @observable ingredients: Ingredient[] = [];
  @observable units: Unit[] = [];
  @observable openDialogForm: boolean = false;
  //New ingredient variables
  @observable title: string = '';
  @observable amount: number;
  @observable selectedUnit;


  constructor() {
    
  }

  async onIngredientsPageLoad()
  {
    this.ingredients = await ns.fetchIngredients();
    this.units = await ns.fetchUnits()
    console.log(this.units);
  }

  async findUnitById(id: string)
  {
    const unit = await ns.findUnitById(id);
    if (!!unit)
      return unit.title;
    return null;
  }

  ingredientTitleChanged(title: string)
  {
    this.title = title;
  }

  ingredientAmountChanged(amount: number)
  {
    this.amount = amount;
  }

}

export let store: Store = new Store();
