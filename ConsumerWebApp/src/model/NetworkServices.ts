import * as network from '../../../common/network';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';

export async function fetchFoodMenu(): Promise<FoodMenuItem[]> {
  const fields = `_id, title, price, description, imgURL, 
      boolOptions { label, key }, 
      options { key, label, optionItems { key, label } }`;
  const query = `query { menuItems(lat: ${0.0}, lng: ${0.0}) { ${fields} } }`;
  const result = await network.fetchQuery(query);
  return result.menuItems;
}

export async function sendOrderRequest(orderRequest: IOrderRequest) {
  const mutation = `mutation { saveOrder( fmiData: ${objToGrahqlStr(orderRequest)} ) }`;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}
