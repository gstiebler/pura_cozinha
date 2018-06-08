import { Purchase } from "../../db/models/Purchase";
import { TOrderStatus, IFoodMenuItem } from "../../../../common/Interfaces";

import * as kitchenNs from "../../../../KitchenWebApp/src/model/NetworkServices";

export async function getIngredientTypesStocks() {
  //Get prepared items
  const closedStatuses: TOrderStatus[] = ["DELIVERING", "DELIVERED"];
  const closedOrders = await kitchenNs.getOrders(closedStatuses);

  const stockTemp = await Purchase.aggregate([
    { $group: { _id: "$ingredientType", total: { $sum: "$quantity" } } },
    { $sort: { total: -1 } }
  ]);

  let ingredientTypesStock: any[] = [];

  closedOrders.forEach(async order => {
    const promises = order.items.map(async item => {
      const menuItem = await kitchenNs.getFoodMenuItem(item.foodMenuItem.id);
      const results = menuItem.usedIngredients.reduce(
        (previous, usedIngredient) => {
          let i = stockTemp.findIndex(
            it => it._id == usedIngredient.ingredient
          );
          const itStock = {
            _id: stockTemp[i]._id,
            total: stockTemp[i].total - usedIngredient.quantity
          };
          previous.push(itStock);
          return previous;
        },
        []
      );
      ingredientTypesStock = ingredientTypesStock.concat(results);
    });
    await Promise.all(promises);
  });

  return ingredientTypesStock;
}
