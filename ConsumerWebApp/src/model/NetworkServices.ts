import * as network from '../../../common/network';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';

export async function fetchFoodMenu(): Promise<FoodMenuItem[]> {
  const query = `
    query {
      menuItems( lat: ${0.0}, lng: ${0.0} ) { 
        _id, 
        title, 
        price, 
        description, 
        imgURL, 
        boolOptions {  label,  key  }, 
        options { 
          key, 
          label, 
          optionItems { key,  label }
        }
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.menuItems;
}

export async function sendOrderRequest(orderRequest: IOrderRequest) {
  const items = orderRequest.orderSummary.items.map(item => {
    return `
      {
        fmi: {
          _id: "${item.fmi._id}",
          title: "${item.fmi.title}",
          description: "${item.fmi.description}",
          price: ${item.fmi.price},
          imgURL: "${item.fmi.imgURL}",
          selectedOptions: [${item.fmi.selectedOptions}],
          selectedBoolOptions: [${item.fmi.selectedBoolOptions}]
        },
        qty: ${item.qty},
        itemTotalPrice: ${item.itemTotalPrice}
      }
    `;
  });
  const mutation = `
    mutation {
      saveOrder (
        fmiData: {
          orderSummary: {
            items: [
              ${items.join(',')}
            ],
            totalAmount: ${orderRequest.orderSummary.totalAmount}
          },
          local: "${orderRequest.local}",
          paymentOption: "${orderRequest.paymentOption}",
          telephoneNumber: "${orderRequest.telephoneNumber}"
        }
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}
