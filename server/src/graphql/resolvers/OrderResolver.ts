import { IOrderRequest } from '../../../../common/Interfaces';
import { Order, IOrder } from '../../db/models/Order';
import * as Twitter from '../../lib/Twitter';
import * as OrderProcess from '../../core/OrderProcess';

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
    comments: fmiData.comments,
    kitchenComments: fmiData.kitchenComments,
    paymentOption: fmiData.paymentOption,
    telephoneNumber: fmiData.telephoneNumber,
    totalAmount: fmiData.orderSummary.totalAmount,
    items,
    statusHistory: [],
  };
  const order = new Order(orderObj);
  const formattedOrder = OrderProcess.formatOrder(orderObj);
  Twitter.sendTwit(formattedOrder);
  await order.save();
}
