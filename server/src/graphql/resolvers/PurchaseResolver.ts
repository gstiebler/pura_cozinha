import { Purchase } from "../../db/models/Purchase";
import { IngredientType } from "../../db/models/IngredientType";
import { KitchenStock } from "../../db/models/KitchenStock";
import { Order } from "../../db/models/Order";
import { MenuItem } from "../../db/models/menuItem";
import { TOrderStatus, IFoodMenuItem } from "../../../../common/Interfaces";
import * as Bluebird from 'bluebird';
import * as kitchenNs from "../../../../KitchenWebApp/src/model/NetworkServices";


export async function getIngredientTypesStocks() {
  //Get prepared items
  const closedStatuses: TOrderStatus[] = ['DELIVERING', 'DELIVERED', 'PENDING', 'PREPARING', ];
  const query = { status: { $in: closedStatuses } };
  const menuItems: any[] = [];
  
  const orders = await Order.find(query);

  await orders.forEach(async order => {
    const promises = order.items.map(async item => {
      const menuItem = await MenuItem.findOne({_id: item.foodMenuItem.id});  
      menuItems.push(menuItem.toObject());
    });
    await Promise.all(promises);
  });

  const ingredientTypes = await IngredientType.find();

  const stocks = await ingredientTypes.map(async ingredient => {
    const editedStock = await KitchenStock.findOne({ ingredientType: ingredient._id });
    let updated = new Date('1970-01-01');
    let finalTotal = 0;
    if(editedStock)
    {
      updated = editedStock.toObject().updatedAt;
      finalTotal = editedStock.toObject().quantity;
    }

    const ingredientStock = await Purchase.aggregate([
      { $match : { ingredientType : ingredient._id, buyDate: { $gte: updated } } },
      { $group:  { _id: '$ingredientType',  total: { $sum: "$quantity" } } },
    ]);

    if(ingredientStock)
      finalTotal += ingredientStock[0].total;
    console.log('_id ' + ingredient._id + ', ' + finalTotal);
    return {
      _id: ingredient._id,
      total: finalTotal
    }
  });

  console.log('Final ' + stocks);
  
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
