import * as network from '../../../common/network';
import * as ns from '../../../common/NetworkServices';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';

export async function fetchFoodMenu(): Promise<FoodMenuItem[]> {
  const fields = '_id, title, price, description, imgURL';
  const query = `query { menuItems(lat: ${0.0}, lng: ${0.0}) { ${fields} } }`;
  const result = await network.fetchQuery(query);
  return result.menuItems;
}

export async function sendOrderRequest(orderRequest: IOrderRequest) {
  const mutation = `mutation { saveOrder( fmiData: ${objToGrahqlStr(orderRequest)} ) }`;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}


export async function findKitchenById(kitchenId: string): Promise<any> {
  return ns.findKitchenById(kitchenId);
}

export async function getItemsByKitchen(kitchenId: string): Promise<any> {
  return ns.getItemsByKitchen(kitchenId);
}