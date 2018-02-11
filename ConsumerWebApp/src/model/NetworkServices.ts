import * as network from '../lib/network';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
} from '../../../common/Interfaces';

export async function fetchFoodMenu(): Promise<FoodMenuItem[]> {
  const fields = '_id, title, price, description, imgURL';
  const query = `query { menuItems(lat: ${0.0}, lng: ${0.0}) { ${fields} } }`;
  const result = await network.fetchQuery(query);
  return result.menuItems;
}

export async function sendOrderRequest(orderRequest: IOrderRequest) {
  const values = `
    selectedLocal: ${orderRequest.selectedLocal},
    selectedPaymentOption: ${orderRequest.selectedPaymentOption},
    telephoneNumber: ${orderRequest.telephoneNumber},
    totalAmount: ${orderRequest.totalAmount},
  `;
  const mutation = `mutation { saveOrder(${values}) } { msg }`;
}
