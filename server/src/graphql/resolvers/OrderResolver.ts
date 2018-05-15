import { IOrderRequest } from '../../../../common/Interfaces';
import { Order, IOrder, IOrderItem } from '../../db/models/Order';
import * as Twitter from '../../lib/Twitter';
import * as OrderProcess from '../../core/OrderProcess';
import * as logger from 'winston';
import * as Bluebird from 'bluebird';
import { MenuItem } from '../../db/models/menuItem';

/**
 * Return true if order is valid
 * @param fmiData 
 */
async function validateOrder(fmiData: IOrderRequest):Promise<boolean> {
  // TODO: implement validation
  return true;
}

export async function saveOrder(fmiData: IOrderRequest) {
  const isOrderValid = await validateOrder(fmiData);
  if (!isOrderValid) {
    logger.error('Order not valid!');
    throw new Error('Order not valid!');
  }
  const items:IOrderItem[] = fmiData.orderSummary.items.map(item => ({
    qty: item.qty,
    itemTotalPrice: item.itemTotalPrice,
    foodMenuItem: {
      id: item.fmi._id,
      title: item.fmi.title,
      price: item.fmi.price,
      description: item.fmi.description,
      selectedOptions: item.fmi.selectedOptions,
      selectedBoolOptions: item.fmi.selectedBoolOptions,
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
