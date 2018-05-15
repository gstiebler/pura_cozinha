
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
import { IngredientType } from '../../../server/src/db/models/IngredientType';

export const availableUnits = [
  ['KG', '(Kg) - Kilo(s)'],
  ['L', '(L) - Litro(s)'],
  ['CX', '(Cx) - Caixa(s)'],
  ['PCT', '(Pct) - Pacote(s)'],
  ['UN', '(Un.) - Unidade(s)'],
  ['G', '(g) - Grama(s)'],
];

export const readableUnits = new Map(availableUnits as any);

export class Store {

  @observable router;
  @observable isDrawerOpen = false;
  @observable anchorEL = null; //ingredient menu anchor to Edit and Delete options
  @observable ingredients: IngredientType[] = [];
  @observable openDialogForm: boolean = false;
  @observable currentIngredient = null;
  
  //New ingredient variables
  @observable title: string = '';
  @observable selectedUnit: string;
  //snack bar message settings
  @observable isSnackbarOpen: boolean = false;
  @observable snackbarMsg: string = '';


  constructor() {
    
  }


  async reset() {
    this.title = '';
    this.snackbarMsg = '';
    this.currentIngredient = null;
    this.ingredients = await ns.fetchIngredientTypes();
  }

  async onIngredientsPageLoad()
  {
    this.ingredients = await ns.fetchIngredientTypes();
  }

  async findIngredientById(id: string)
  {
    this.currentIngredient = await ns.findIngredientTypeById(id);
    this.title = this.currentIngredient.title;
    this.selectedUnit = this.currentIngredient.unit;
  }

  ingredientTitleChanged(title: string)
  {
    this.title = title;
  }

  unitSelected(unit: string)
  {
    this.selectedUnit = unit;
  }

  async onSendIngredientRequested() {
    try {
      const request:IIngredientRequest = {
        title: this.title,
        unit: this.selectedUnit
      };
      await ns.sendIngredientTypeRequest(request);
      await this.reset();
      this.setSnackbarMsg('Insumo salvo com sucesso');
      this.openDialogForm = false;
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao salvar Insumo');
    }
  }

  async onDeleteIngredientRequested() {
    try {
      await ns.deleteIngredientType(this.currentIngredient._id);
      this.reset();
      this.setSnackbarMsg('Insumo removido com sucesso');
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao remover Insumo');
    }
  }

  async onUpdateIngredientRequested() {
    try {
      const request:IIngredientRequest = {
        title: this.title,
        unit: this.selectedUnit
      };
      await ns.updateIngredientTypeRequest(request, this.currentIngredient._id);
      await this.reset();
      this.setSnackbarMsg('Insumo editado com sucesso');
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao editar Insumo');
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
