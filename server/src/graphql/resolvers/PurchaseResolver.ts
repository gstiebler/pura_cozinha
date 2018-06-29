import { Purchase } from "../../db/models/Purchase";
import { IngredientType } from "../../db/models/IngredientType";
import { KitchenStock } from "../../db/models/KitchenStock";
import { Order } from "../../db/models/Order";
import { MenuItem } from "../../db/models/menuItem";
import { TOrderStatus, IFoodMenuItem } from "../../../../common/Interfaces";
import * as Bluebird from "bluebird";
import * as kitchenNs from "../../../../KitchenWebApp/src/model/NetworkServices";
import { Map } from "immutable";

export async function getIngredientTypesStocks() {
  //Get prepared items
  const closedStatuses: TOrderStatus[] = [
    "DELIVERING",
    "DELIVERED",
    "PENDING",
    "PREPARING"
  ];
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
  
  const purchasesStock = await Bluebird.map(
    ingredientTypes,
    async ingredient => {
      const editedStock = kitchenStocks.find(
        ks => ks.toObject().ingredientType == ingredient._id.toString()
      );
      let updated = new Date("1970-01-01");
      let finalTotal = 0;
      if (editedStock) {
        updated = editedStock.toObject().updatedAt;
        finalTotal = editedStock.toObject().quantity;
      }

      const ingredientStock = await Purchase.aggregate([
        {
          $match: { ingredientType: ingredient._id, buyDate: { $gte: updated } }
        },
        { $group: { _id: "$ingredientType", total: { $sum: "$quantity" } } }
      ]);
      
      if (ingredientStock && ingredientStock.length != 0) {
        finalTotal += ingredientStock[0].total;
      }
        
      
      return {
        _id: ingredient._id,
        total: finalTotal
      };
    }
  );
  purchasesStock.map(it => console.log(it.total));
  const menuItemsMap = Map<string, IFoodMenuItem>(
    menuItems.map(m => [m._id.toString(), m])
  );

  const zeroStockArray = ingredientTypes.map(i => [i._id, 0.0]);
  const zeroStockIngredients = Map<string, number>(zeroStockArray);

  const stocksFromOrders = ingredientTypes.reduce((aggregate, ingredientType) => {
    const reducedMenu = orders.reduce((aggregate, order) => {
      const reducedItems = order.items.reduce((menuAggregate, orderMenu) => {
        const menuItem: IFoodMenuItem = menuItemsMap.get(orderMenu.foodMenuItem.id.toString());
        const reducedIngredient = menuItem.usedIngredients.reduce( (prevTotal, ingredient) => {
            
            const editedStock = kitchenStocks.find(ks => ks.toObject().ingredientType.toString() == ingredient.ingredient);
            const previousIngQty = prevTotal;
            let totalLeft = 0;
            if(ingredientType.toObject()._id.toString() == ingredient.ingredient)
            {
              if(editedStock)
              {
                if(order.createdOn.getTime() > editedStock.toObject().updatedAt.getTime())
                  totalLeft = previousIngQty + ingredient.quantity 
              }
              else
                totalLeft = previousIngQty + ingredient.quantity;
            }

            return totalLeft * orderMenu.qty;
        },0);
        return reducedIngredient + menuAggregate;
      }, 0);
      return reducedItems + aggregate;
    }, 0);
    return aggregate.set(ingredientType._id.toString(), reducedMenu);
  }, zeroStockIngredients);



  // sum the stock from the purchases and the negative stock from the orders 
  const stock = ingredientTypes.map(ingredient => { 
    
    let total = 0;
    const stockLeft = purchasesStock.find(ps => ps._id == ingredient._id.toString());
    total = (stockLeft) ? stockLeft.total: 0;

    const totalFromOrder = stocksFromOrders.get(ingredient._id.toString());
    total = (totalFromOrder) ? total - totalFromOrder : total;

    return { 
      _id: ingredient._id, 
      total: total, 
    }; 
  }); 

  return stock;
}
