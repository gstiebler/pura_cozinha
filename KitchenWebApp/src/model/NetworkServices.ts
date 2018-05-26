import * as network from '../../../common/network';
import { IOrderSummary } from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';
import { TOrderStatus } from '../../../common/Interfaces';
import { IKitchenModel } from '../../../server/src/db/models/kitchen';
import { Purchase } from '../../../server/src/db/models/Purchase';
import * as ns from '../../../common/NetworkServices';

const ordersStatusFields = [
  '_id',
  'local',
  'localComplement',
  'status',
  'totalAmount',
  'createdOn',
];

export async function getOrders(orderTypes: string[]): Promise<any[]> {
  const params = `
    offset: ${0},
    limit: ${100},
    orderTypes: [${orderTypes.map(ot => `"${ot}"`).join(', ')}]
  `;
  const fieldsStr = ordersStatusFields.join(', ');
  const query = `query { orders( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.orders;
}

export async function getOrderDetails(orderId: string): Promise<any> {
  const params = `
    orderId: "${orderId}"
  `;
  const fields = [
    '_id',
    'local',
    'localComplement',
    'status',
    'totalAmount',
    'createdOn',
    'paymentOption',
    'telephoneNumber',
    'comments',
    'kitchenComments',
    'items { qty, itemTotalPrice, foodMenuItem { title, description, price } }'
  ];
  const fieldsStr = fields.join(', ');
  const query = `query { orderDetails( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.orderDetails;
}

export async function findUser(login: string, password: string): Promise<any> {
  const params = `
    login: "${login}",
    password: "${password}"
  `;
  const fields = [
    '_id',
    'login',
    'password',
    'name',
    'token',
    'role',
  ];
  
  const fieldsStr = fields.join(', ');
  const query = `query { getUser( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.getUser;
}

export async function findUserByToken( token: string): Promise<any> {
  const params = `
    token: "${token}"
  `;
  const fields = [
    '_id',
    'login',
    'password',
    'name',
    'token',
    'role',
  ];
  
  const fieldsStr = fields.join(', ');
  const query = `query { getUserByToken( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.getUserByToken;
}

export async function changeOrderStatus(orderId: string, status: TOrderStatus): Promise<string> {
  const mutation = `mutation { changeOrderStatus( orderId: "${orderId}", status: "${status}" ) }`;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function changeKitchenComments(orderId: string, comments: string): Promise<string> {
  const mutation = `mutation { changeKitchenComments( orderId: "${orderId}", kitchenComments: "${comments}" ) }`;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function updateKitchenStatus(kitchenId: string, status: boolean): Promise<string> {
  const mutation = `mutation { updateKitchenStatus( id: "${kitchenId}", active: ${status} ) }`;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function updateKitchen(kitchen: IKitchenModel): Promise<string> {
  const mutation = `mutation { updateKitchenStock( newKitchenData: ${objToGrahqlStr(kitchen)} ) }`;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function findKitchenById(kitchenId: string): Promise<any> {
  return ns.findKitchenById(kitchenId);
}

export async function getItemsByKitchen(kitchenId: string): Promise<any> {
  return ns.getItemsByKitchen(kitchenId);
}

export async function fetchIngredientTypesAmount(): Promise<Purchase[]> {
  const query = `
    query {
      ingredientTypeSums { 
        _id, 
        total,
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.ingredientTypeSums;
}