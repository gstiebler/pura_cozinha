import * as network from '../../../common/network';
import * as ns from '../../../common/NetworkServices';
import { 
  TfmiId,
  IFoodMenuItem,
  IOrderSummary,
  IOrderRequest,
  IPaymentRequest
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';

export async function fetchFoodMenu(): Promise<IFoodMenuItem[]> {
  const query = `
    query {
      menuItems( lat: ${0.0}, lng: ${0.0} ) { 
        _id, 
        title, 
        price, 
        description, 
        imgURL, 
        boolOptions {  label, key, price  }, 
        options { 
          key, 
          label, 
          optionItems { label, key, price }
        }
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.menuItems;
}

export async function sendOrderRequest(orderRequest: IOrderRequest) {
  const items = orderRequest.orderSummary.items.map(item => {
    const selectedBoolOptions = item.fmi.selectedBoolOptions.map(selBOpt => {
      return `
        {
          key: "${selBOpt.key}",
          price: ${selBOpt.price},
          label: "${selBOpt.label}"
        }
      `;
    });
    const selectedOptions = item.fmi.selectedOptions.map(selGroupOption => {
      return `
        {
          key: "${selGroupOption.key}",
          value: "${selGroupOption.value}",
          price: ${selGroupOption.price},
          label: "${selGroupOption.label}"
        }
      `;
    });
    return `
      {
        fmi: {
          _id: "${item.fmi._id}",
          title: "${item.fmi.title}",
          description: "${item.fmi.description}",
          price: ${item.fmi.price},
          imgURL: "${item.fmi.imgURL}",
          selectedOptions: [${selectedOptions.join(',')}],
          selectedBoolOptions: [${selectedBoolOptions.join(',')}]
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
          localComplement: "${orderRequest.localComplement}",
          comments: "${orderRequest.comments}",
          paymentOption: "${orderRequest.paymentOption}",
          telephoneNumber: "${orderRequest.telephoneNumber}"
        }
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}


export async function findKitchenById(kitchenId: string): Promise<any> {
  return ns.findKitchenById(kitchenId);
}

export async function getItemsByKitchen(kitchenId: string): Promise<any> {
  return ns.getItemsByKitchen(kitchenId);
}


export async function getPaymentSessionId(): Promise<any> {
  const query = `
    query {
      getSessionId  
    }
  `;
  const result = await network.fetchQuery(query);
  return result.getSessionId;
}


export async function checkoutPayment(request: IPaymentRequest): Promise<any> {
  let i = 0;
  const items = request.items.map(selGroupOption => {
    i++;
    return `
      {
        itemId${i}: "${this.itemId}",
        itemDescription${i}: "${this.itemDescription}",
        itemAmount${i}: "${this.itemAmount}",
        itemQuantity${i}: ${this.itemQuantity},
      }
    `;
  });

  const mutation = `
    mutation {
      checkoutPayment (
        fmiData: {
          items: [
            ${items.join(',')}
          ],
          senderName: "${request.senderName}",
          senderCPF: "${request.senderCPF}",
          senderAreaCode: "${request.senderAreaCode}",
          senderPhone: "${request.senderPhone}",
          senderEmail: "${request.senderEmail}",
          senderHash: "${request.senderHash}",
          shippingAddressStreet: "${request.shippingAddressStreet}",
          shippingAddressNumber: "${request.shippingAddressNumber}",
          shippingAddressComplement: "${request.shippingAddressComplement}",
          shippingAddressDistrict: "${this.shippingAddressDistrict}",
          shippingAddressPostalCode: "${this.shippingAddressPostalCode}",
          shippingAddressCity: "${this.shippingAddressCity}",
          shippingAddressState: "${this.shippingAddressState}",
          creditCardToken: "${this.creditCardToken}",
          installmentValue: "${this.installmentValue}",
          creditCardHolderName: "${this.creditCardHolderName}",
          creditCardHolderCPF: "${this.creditCardHolderCPF}",
          creditCardHolderBirthDate: "${this.creditCardHolderBirthDate}",
          creditCardHolderAreaCode: "${this.creditCardHolderAreaCode}",
          creditCardHolderPhone: "${this.creditCardHolderPhone}"
        }
      ) 
    }
  `;
  console.log(mutation);
  const result = await network.fetchQuery(mutation);
  return result.msg;
}