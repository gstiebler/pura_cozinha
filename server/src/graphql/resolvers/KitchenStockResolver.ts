import { KitchenStock } from "../../db/models/KitchenStock";
import { IKitchenStockRequest } from '../../../../common/Interfaces';

export async function updateKitchenStock(fmiData: IKitchenStockRequest) {
 
  const kitchenStock = await KitchenStock.findOne({
    ingredientType: fmiData.ingredientType
  });

  if(!!kitchenStock)
  {
    fmiData.updatedAt = new Date();
    await KitchenStock.update({ _id: kitchenStock._id }, { $set: fmiData });
  }
  else
  {
    const newKitchenStock = new KitchenStock(fmiData);
    await newKitchenStock.save();
  }
}
