import { Kitchen } from '../db/models/kitchen';
import { MenuItem } from '../db/models/menuItem';
import { Order } from '../db/models/Order';

export async function processOrder(newOrderData) {
  newOrderData.datetime = new Date();
  const kitchen: any = await Kitchen.findOne();
  newOrderData.kitchen = kitchen._id;
  newOrderData.status = 'PAYMENT_PENDING';
  let total = 0.0;
  for (let i = 0; i < newOrderData.items.length; i++) {
    let menu_item_id = newOrderData.items[i].food_menu_item_id;
    let menuItem: any = await MenuItem.findOne({ _id: menu_item_id });
    newOrderData.items[i].title = menuItem.title;
    newOrderData.items[i].price = menuItem.price;
    total += menuItem.price;
  }
  newOrderData.total_paid = total;
  const newOrder = new Order(newOrderData);
  await newOrder.save();
}
