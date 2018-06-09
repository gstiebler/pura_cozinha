import { Purchase } from "../../db/models/Purchase";
import { Order } from "../../db/models/Order";
import { MenuItem } from "../../db/models/menuItem";
import { TOrderStatus, IFoodMenuItem } from "../../../../common/Interfaces";

import * as kitchenNs from "../../../../KitchenWebApp/src/model/NetworkServices";


export async function getIngredientTypesStocks() {
  //Get prepared items
  const closedStatuses: TOrderStatus[] = ['DELIVERING', 'DELIVERED', 'PENDING', 'PREPARING', ];
  const query = { status: { $in: closedStatuses } };
  const menuItems: any[] = [];
  
  const orders = await Order.find(query)
    .sort({ createdOn: -1 })
    .skip(0);

  await orders.forEach(async order => {
    const promises = order.items.map(async item => {
      const menuItem = await MenuItem.findOne({_id: item.foodMenuItem.id});  
      menuItems.push(menuItem.toObject());
    });
    await Promise.all(promises);
  });
  
  const stockTemp = await Purchase.aggregate([
    { $group: { _id: "$ingredientType", total: { $sum: "$quantity" } } },
    { $sort: { total: -1 } }
  ]);
  
  const ingredientTypesStock = stockTemp.reduce( (previous, stock) => {
    let totalUsed = 0;
    menuItems.forEach(menuItem => {
      menuItem.usedIngredients.forEach( usedIngredient=> {
        if(usedIngredient.ingredient == stock._id)
          totalUsed += usedIngredient.quantity;
      });
    });
    stock.total -= totalUsed;
    previous.push(stock);
    return previous;
  }, []);

  return ingredientTypesStock;
}
