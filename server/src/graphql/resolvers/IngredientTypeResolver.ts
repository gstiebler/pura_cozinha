import { Purchase } from "../../db/models/Purchase";
import { IngredientType } from "../../db/models/IngredientType";
import { KitchenStock } from "../../db/models/KitchenStock";


export async function deleteIngredientType(id: string) {
  const itStock = await KitchenStock.findOne({ ingredientType: id });
  const purchase = await Purchase.findOne({ ingredientType: id });
  if(!!itStock || !!purchase)
  {//
    
    IngredientTypeInUseException.prototype = Error.prototype;
    throw new IngredientTypeInUseException('Este insumo não pode ser apagado pois está sendo usado'); 
  }
  await IngredientType.remove({ _id: id });
  return 'OK';
}

function IngredientTypeInUseException(message) {
  this.name = 'MeuErro';
  this.message = message || 'Mensagem de erro padrão';
}
