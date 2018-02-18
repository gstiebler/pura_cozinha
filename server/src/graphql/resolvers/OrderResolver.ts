import { IOrderRequest } from '../../../../common/Interfaces';
import { Order, IOrder } from '../../db/models/Order';

export async function saveOrder(fmiData: IOrderRequest) {
  const items = fmiData.orderSummary.items.map(item => ({
    qty: item.qty,
    itemTotalPrice: item.itemTotalPrice,
    foodMenuItem: {
      id: item.fmi._id,
      title: item.fmi.title,
      price: item.fmi.price,
      description: item.fmi.description,
    },
  }));
  const orderObj: IOrder = {
    userId: 'coffee_shop',
    local: fmiData.local,
    localComplement: fmiData.localComplement,
    paymentOption: fmiData.paymentOption,
    telephoneNumber: fmiData.telephoneNumber,
    totalAmount: fmiData.orderSummary.totalAmount,
    items,
  };
  const order = new Order(orderObj);
  await order.save();
}