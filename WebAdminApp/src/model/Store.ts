
import { computed, observable } from 'mobx';
import * as ns from './NetworkServices';
import * as _ from 'lodash';
import {
  TfmiId,
  TPaymentOptions,
  IUnit,
  IIngredientRequest,
  ISelectedMenuItemOption,
  IPurchaseRequest,
} from '../../../common/Interfaces';
import { availableUnits } from '../../../common/unitMaps';
import { IngredientType } from '../../../common/Interfaces';
import { Purchase } from '../../../server/src/db/models/Purchase';


export class Store {

  @observable router;
  @observable isDrawerOpen = false;
  @observable anchorEL = null; //ingredient menu anchor to Edit and Delete options
  @observable imgLoaderUrl = 'https://bit.ly/238UUAJ'; //ingredient menu anchor to Edit and Delete options

  @observable ingredients: IngredientType[] = [];
  @observable purchases: Purchase[] = [];
  @observable openDialogForm: boolean = false;
  @observable currentIngredient = null;
  @observable currentPurchase = null;
  @observable purchasesTotal: number = 0;
  @observable page: number = 0;
  @observable PER_PAGE: number = 8;
  @observable hasMore: boolean = true;
  
  //New ingredient variables
  @observable title: string = '';
  @observable selectedUnit: string;

  //New purchase variables
  @observable quantity: string = '';
  @observable value: string = '';
  @observable ingredientTypeId: string = '';
  @observable buyDate: Date;
  @observable newPurchases: any[] = [];
  @observable totalAmount: number = 0;

  //snack bar message settings
  @observable isSnackbarOpen: boolean = false;
  @observable snackbarMsg: string = '';


  constructor() {
    
  }


  async reset() {
    this.title = '';
    this.snackbarMsg = '';
    this.currentIngredient = null;
    this.newPurchases = [];
    this.ingredients = await ns.fetchIngredientTypes();
    this.totalAmount = 0;
    this.selectedUnit = availableUnits[0][0];
  }

  async onIngredientsPageLoad()
  {
    this.ingredients = await ns.fetchIngredientTypes();
    this.selectedUnit = availableUnits[0][0];
  }

  async onPurchasesPageLoad()
  {
    this.ingredients = await ns.fetchIngredientTypes();
    this.purchases = await ns.fetchPurchasesPerPage(0, this.PER_PAGE);
    this.purchasesTotal = await ns.countPurchases();
    this.ingredientTypeId = this.ingredients[0]._id;
    this.hasMore = true;
    this.page = 0;
  }


  async fetchMorePurchasesData() {
    this.hasMore = (this.purchases.length < this.purchasesTotal);
    this.page++;
    const newPurchases = await ns.fetchPurchasesPerPage(this.page, this.PER_PAGE);    
    this.purchases = this.purchases.concat(newPurchases);
  };

  async findIngredientById(id: string)
  {
    this.currentIngredient = await ns.findIngredientTypeById(id);
    this.title = this.currentIngredient.title;
    this.selectedUnit = this.currentIngredient.unit;
  }

  async findPurchaseById(id: string)
  {
    this.currentPurchase = await ns.findPurchaseById(id);
  }

  ingredientTitleChanged(title: string)
  {
    this.title = title;
  }

  unitSelected(unit: string)
  {
    this.selectedUnit = unit;
  }

  ingredientTypeSelected(it: string)
  {
    this.ingredientTypeId = it;
  }

  buyDateChanged(buyDate: Date)
  {
    this.buyDate = buyDate;
  }

  valueChanged(value: string)
  {
    this.value = value;
  }

  quantityChanged(qty: string)
  {
    this.quantity = qty;
  }

  
  removeFromNewPurchases(key: number)
  {
    const index = this.newPurchases.findIndex(obj => obj.key==key);
    this.newPurchases.splice(index, 1);
    this.calculateTotalAmount();
  }

  addNewPurchase()
  {
    const newPurchase = {
      key: this.newPurchases.length+1,
      quantity: parseFloat(this.quantity),
      buyDate: this.buyDate,
      value: parseFloat(this.value),
      ingredientType: this.getPurchaseIngredientType(this.ingredientTypeId)
    }
    this.newPurchases.push(newPurchase);
    this.calculateTotalAmount();
    this.quantity = '';
    this.value = '';
    this.ingredientTypeId = this.ingredients[0]._id;
  }

  calculateTotalAmount()
  {
    this.totalAmount = 0;
    this.newPurchases.map(np => {
      this.totalAmount += np.value;
    });
  }

  getPurchaseIngredientType(id: string): any
  {
    return this.ingredients.filter(obj => obj._id === id)[0]; 
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

  async onSendPurchaseRequested() {
    try {
      await this.newPurchases.map(async purchase => {
        const request:IPurchaseRequest = {
          value: purchase.value,
          quantity: purchase.quantity,
          buyDate: new Date(this.buyDate),
          ingredientType: purchase.ingredientType._id
        };
        await ns.sendPurchaseRequest(request);
      });
      await this.onPurchasesPageLoad();
      await this.reset();
      this.setSnackbarMsg('Compras salvas com sucesso');
      this.openDialogForm = false;
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao salvar compras');
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

  async onDeletePurchaseRequested() {
    try {
      await ns.deletePurchase(this.currentPurchase._id);
      this.reset();
      this.setSnackbarMsg('Compra removida com sucesso');
    } catch(error) {
      console.error(error);
      this.setSnackbarMsg('Erro ao remover compra');
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
