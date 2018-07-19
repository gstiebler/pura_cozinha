import { Purchase } from "../../db/models/Purchase";
import { IngredientType } from "../../db/models/IngredientType";
import { KitchenStock } from "../../db/models/KitchenStock";
import { Order } from "../../db/models/Order";
import { MenuItem } from "../../db/models/menuItem";
import { TOrderStatus, IFoodMenuItem } from "../../../../common/Interfaces";
import * as Bluebird from "bluebird";
import * as kitchenNs from "../../../../KitchenWebApp/src/model/NetworkServices";
import { Map } from "immutable";
import { ObjectId, ObjectID } from 'bson';

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
        ks => ks.ingredientType == ingredient._id.toString()
      );
      let updated = new Date("1970-01-01");
      let finalTotal = 0;
      if (editedStock) {
        updated = editedStock.updatedAt;
        finalTotal = editedStock.quantity;
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
            
            const editedStock = kitchenStocks.find(ks => ks.ingredientType.toString() == ingredient.ingredient);
            const previousIngQty = prevTotal;
            let totalLeft = 0;
            if(ingredientType._id.toString() == ingredient.ingredient)
            {
              if(editedStock)
              {
                if(order.createdOn.getTime() > editedStock.updatedAt.getTime())
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


export async function savePurchase(fmiData: any) {

  const currentPurchaseDate = new Date(fmiData.buyDate);
  //Get last purchase saved with same buyDate
  const lastPurchases = await Purchase.aggregate([
      // Extract the year, month and day portions of the 'enddate' 
      {
        $project:
          {
            year: { $year: "$buyDate" },
            month: { $month: "$buyDate" },
            day: { $dayOfMonth: "$buyDate" },
            buyDate: "$buyDate"
          }
      },
      // Filter by date - Replace hard-coded values with values you want
      {
        $match:
          {
            year:  currentPurchaseDate.getFullYear() ,
            month:  currentPurchaseDate.getMonth() + 1,
            day:  currentPurchaseDate.getUTCDate() 
          }
      }
  ]).sort({buyDate: -1}).limit(1);

  if(!!lastPurchases[0])
  {
    const lastDate = new Date(lastPurchases[0].buyDate);
    currentPurchaseDate.setSeconds(lastDate.getSeconds() + 1);
    fmiData.buyDate = currentPurchaseDate.getTime();
  }

  fmiData.ingredientType = new ObjectID(fmiData.ingredientType);
  const purchase = new Purchase(fmiData);
  await purchase.save();
  return { msg: 'OK' };
}