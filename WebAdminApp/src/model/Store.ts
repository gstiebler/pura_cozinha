
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {
  TfmiId,
  TPaymentOptions,
  FoodMenuItem,
  IUnit,
  IIngredientRequest,
  ISelectedMenuItemOption,
} from '../../../common/Interfaces';
import { Ingredient } from '../../../server/src/db/models/Ingredient';
import { Unit } from '../../../server/src/db/models/Unit';
export class Store {

  @observable router;
  @observable isDrawerOpen = false;
  @observable anchorEL = null; //ingredient menu anchor to Edit and Delete options
  @observable ingredients: Ingredient[] = [];
  @observable units: Unit[] = [];
  @observable openDialogForm: boolean = false;
  @observable currentIngredient = null;
  //New ingredient variables
  @observable title: string = '';
  @observable amount: string= '';
  @observable selectedUnit;
  //snack bar message settings
  @observable isSnackbarOpen: boolean = false;
  @observable snackbarMsg: string = '';


  constructor() {
    
  }


  async reset() {
    this.title = '';
    this.amount = '';
    this.snackbarMsg = '';
    this.ingredients = await ns.fetchIngredients();
    this.units = await ns.fetchUnits();
  }

  async onIngredientsPageLoad()
  {
    this.units = await ns.fetchUnits();
    this.ingredients = await ns.fetchIngredients();
  }

  async findUnitById(id: string)
  {
    const unit = await ns.findUnitById(id);
    if (!!unit)
      return unit;
    return null;
  }

  async findIngredientById(id: string)
  {
    console.log(id);
    this.currentIngredient = await ns.findIngredientById(id);
    console.log(await ns.findIngredientById(id));
  }

  ingredientTitleChanged(title: string)
  {
    this.title = title;
  }

  ingredientAmountChanged(amount: string)
  {
    this.amount = amount;
  }

  unitSelected(unit: string)
  {
    this.selectedUnit = unit;
  }

  async onSendIngredientRequested() {
    try {
      const totalAmount: number = parseFloat(this.amount);
      const request:IIngredientRequest = {
        title: this.title,
        amount: totalAmount,
        unit: this.selectedUnit
      };
      await ns.sendIngredientRequest(request);
      await this.reset();
      this.setSnackbarMsg('Ingrediente salvo com sucesso');
      this.openDialogForm = false;
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao salvar ingrediente');
    }
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
