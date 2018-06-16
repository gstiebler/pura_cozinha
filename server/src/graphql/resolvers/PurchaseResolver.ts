import { Purchase } from "../../db/models/Purchase";
import { IngredientType } from "../../db/models/IngredientType";
import { KitchenStock } from "../../db/models/KitchenStock";
import { Order } from "../../db/models/Order";
import { MenuItem } from "../../db/models/menuItem";
import { TOrderStatus, IFoodMenuItem } from "../../../../common/Interfaces";
import * as Bluebird from 'bluebird';
import * as kitchenNs from "../../../../KitchenWebApp/src/model/NetworkServices";
import { Map } from 'immutable'; 


export async function getIngredientTypesStocks() {
  //Get prepared items
  const closedStatuses: TOrderStatus[] = ['DELIVERING', 'DELIVERED', 'PENDING', 'PREPARING', ];
  const query = { status: { $in: closedStatuses } };
  
  const {  
    orders,  
    menuItems,  
    ingredientTypes, 
    kitchenStocks
  } = await Bluebird.props({ 
    orders: Order.find(query), 
    menuItems: MenuItem.find(), 
    ingredientTypes: IngredientType.find(), 
    kitchenStocks: KitchenStock.find()
  }); 
  
  const purchasesStock = await Bluebird.map(ingredientTypes, async ingredient => {
    const editedStock = kitchenStocks.find(ks => ks.toObject().ingredientType == ingredient._id.toString());
    let updated = new Date('1970-01-01');
    let finalTotal = 0;
    // console.log('edited stock ' + (kitchenStocks[0].toObject().ingredientType == ingredient._id.toString()));
    if(editedStock)
    {
      updated = editedStock.toObject().updatedAt;
      finalTotal = editedStock.toObject().quantity;
      console.log('final total ' + finalTotal);
    }

    const ingredientStock = await Purchase.aggregate([
      { $match : { ingredientType : ingredient._id, buyDate: { $gte: updated } } },
      { $group:  { _id: '$ingredientType',  total: { $sum: "$quantity" } } },
    ]);

    if(ingredientStock)
      finalTotal += ingredientStock[0].total;
    
    return {
      _id: ingredient._id,
      total: finalTotal
    }
  });
  purchasesStock.map(p => console.log('purchases '+p.total + ' ' + p._id));
  const menuItemsMap = Map<string, IFoodMenuItem>(menuItems.map(m => [m._id.toString(), m])); 
 
  const zeroStockArray = ingredientTypes.map(i => [i._id, 0.0]); 
  const zeroStockIngredients = Map<string, number>(zeroStockArray);

  // calculate the stock decreased by the orders 
  // reduce from the orders array 
  const stockFromOrders = orders.reduce((aggregate, order) => { 
    
    // reduce from the items of the current order 
    const reducedItems = order.items.reduce((menuAggregate, orderMenu) => { 
      
      const menuItem: IFoodMenuItem = menuItemsMap.get(orderMenu.foodMenuItem.id.toString()); 
      console.log('Used ingredients : ' + menuItem);
      // reduce from the ingredients of the menu item 
      const reducedIngredient = menuItem.usedIngredients.reduce((menuItemAgg: Map<any, number>, ingredient) => { 
        const editedStock = kitchenStocks.find(ks => ks.toObject().ingredientType == ingredient.ingredient);
        
        const previousIngQty = menuItemAgg.get(ingredient.ingredient); 
        let totalLeft = 0;
        console.log('Ingrediente em loop: ' + ingredient.quantity);

        if(editedStock)
          totalLeft = (order.createdOn >= editedStock.toObject().buyDate) ? previousIngQty - ingredient.quantity : previousIngQty;
        else 
          totalLeft = previousIngQty - ingredient.quantity;

        return menuItemAgg.set(ingredient, totalLeft); 
      }, menuAggregate); 
      return reducedIngredient; 
    }, aggregate); 
    return reducedItems; 

  }, zeroStockIngredients); 

  console.log('stock order  ' + stockFromOrders);

  // sum the stock from the purchases and the negative stock from the orders 
  const stock = ingredientTypes.map(ingredient => { 
    const qtyPurchase = purchasesStock.find(it => it._id == ingredient._id); 
    const qtyOrder = stockFromOrders.get(ingredient._id); 
    return { 
      ingredient: ingredient._id, 
      qty: qtyPurchase.total + qtyOrder, 
    }; 
  }); 

  return stock;
}
