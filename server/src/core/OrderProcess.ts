import { MenuItem } from '../db/models/menuItem';
import { Order } from '../db/models/Order';
import { Kitchen } from '../db/models/kitchen';
import { payCreditCard } from './Payment';
import { getKitchenLogic } from '../KitchenTelegram/KitchenBotLogic';

export async function processOrder(newOrderData) {
  newOrderData.datetime = new Date();
  newOrderData.kitchen = newOrderData.selected_kitchen_id;
  newOrderData.status = 'PAYMENT_PENDING';
  let total = 0.0;
  for (let i = 0; i < newOrderData.items.length; i++) {
    let menu_item_id = newOrderData.items[i].food_menu_item_id;
    let menuItem: any = await MenuItem.findOne({ _id: menu_item_id });
    newOrderData.items[i].title = menuItem.title;
    newOrderData.items[i].price = menuItem.price;
    total += menuItem.price * newOrderData.items[i].quantity;
  }
  newOrderData.total_paid = total;
  const newOrder = new Order(newOrderData);
  await newOrder.save();
  try {
    const kitchen: any = await Kitchen.findById(newOrderData.kitchen);
    const kitchenBotLogic = getKitchenLogic(kitchen.telegram_username);
    kitchenBotLogic.sendOrder(newOrderData.items, newOrderData.name, newOrderData.address);
  } catch (err) {
    console.error(err);
  }

  // Pay
  try {
    const resPayment = await payCreditCard(newOrderData.credit_card_info, total, 'new payment');
    await Order.update({_id: newOrder._id }, { $set: { payment_info: resPayment} });
  } catch (err) {
    await Order.update({_id: newOrder._id }, { $set: { payment_info: 'error on payment' } });
    throw new Error(err.message + ' - ' + JSON.stringify(err.response.details));
  }
}
