import { Purchase } from "../../db/models/Purchase";
import { IngredientType } from "../../db/models/IngredientType";
import { KitchenStock } from "../../db/models/KitchenStock";
import { Order } from "../../db/models/Order";
import { MenuItem } from "../../db/models/menuItem";
import { TOrderStatus, IFoodMenuItem } from "../../../../common/Interfaces";
import * as Bluebird from "bluebird";
import * as kitchenNs from "../../../../KitchenWebApp/src/model/NetworkServices";
import { Map } from "immutable";

export async function deleteIngredientType(id: string) {
  const itStock = await KitchenStock.findOne({ ingredientType: id });
  const purchase = await Purchase.findOne({ ingredientType: id });
  console.log(itStock + ' ' + purchase);
  if(!!itStock || !!purchase)
  {//
    
    IngredientTypeInUseException.prototype = Object.create(IngredientTypeInUseException.prototype);
    IngredientTypeInUseException.prototype.constructor = IngredientTypeInUseException;
    throw new IngredientTypeInUseException('Este insumo já está registrado em estoque'); 
  }
  // await IngredientType.remove({ _id: id });
  return 'OK';
}

function IngredientTypeInUseException(message) {
  this.name = 'MeuErro';
  this.message = message || 'Mensagem de erro padrão';
  this.stack = (new Error()).stack;
}
