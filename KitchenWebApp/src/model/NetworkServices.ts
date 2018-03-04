import * as network from '../../../common/network';
import { IOrderSummary } from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';

export async function getOrders(): Promise<any[]> {
  const params = `
    offset: ${0},
    limit: ${100}
  `;
  const fields = [
    '_id',
    'local',
    'localComplement',
    'status',
    'totalAmount',
    'createdOn',
  ];
  const fieldsStr = fields.join(', ');
  const query = `query { orders( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.orders;
}

export async function getOrderDetails(orderId: number): Promise<any> {
  const params = `
    orderId: "${orderId}"
  `;
  const fields = [
    'local',
    'localComplement',
    'status',
    'totalAmount',
    'createdOn',
    'paymentOption',
    'telephoneNumber',
    'items { qty, itemTotalPrice, foodMenuItem { title, description, price } }'
  ];
  const fieldsStr = fields.join(', ');
  const query = `query { orderDetails( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.orderDetails;
}
