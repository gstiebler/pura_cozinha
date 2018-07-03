import * as network from '../../../common/network';
import { 
  TfmiId,
  IOrderSummary,
  IIngredientRequest,
  IPurchaseRequest,
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';
import { IngredientType } from '../../../common/Interfaces';
import { Purchase } from '../../../server/src/db/models/Purchase';
import { ObjectID } from 'bson';
import * as ns from '../../../common/NetworkServices';

export async function fetchIngredientTypes(): Promise<IngredientType[]> {  
  return ns.fetchIngredientTypes();
}

export async function fetchPurchases(): Promise<Purchase[]> {
  const query = `
    query {
      allPurchases { 
        _id, 
        quantity,
        value,
        buyDate,
        createdAt,
        ingredientType 
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.allPurchases;
}


export async function fetchPurchasesPerPage(page: number, perPage: number): Promise<Purchase[]> {
  const query = `
    query {
      fetchPurchasesPerPage (page: ${page}, perPage: ${perPage}) { 
        _id, 
        quantity,
        value,
        buyDate,
        createdAt,
        ingredientType 
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.fetchPurchasesPerPage;
}

export async function countPurchases(): Promise<number> {
  const query = `
    query {
      countPurchases 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.countPurchases;
}

export async function findPurchaseById(id: string): Promise<Purchase[]> {
  const query = `
    query {
      purchase (id: "${id}") {
        _id, 
        quantity,
        value,
        buyDate,
        createdAt,
        ingredientType 
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.purchase;
}

export async function findIngredientTypeById(id: string): Promise<IngredientType> {
  return ns.findIngredientTypeById(id);
}



export async function sendIngredientTypeRequest(ingredientRequest: IIngredientRequest) {
  const mutation = `
    mutation {
      saveIngredient (
        fmiData: {
          title: "${ingredientRequest.title}", 
          unit: "${ingredientRequest.unit}", 
        }
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function sendPurchaseRequest(purchaseRequest: IPurchaseRequest) {
  const mutation = `
    mutation {
      savePurchase (
        fmiData: {
          value: ${purchaseRequest.value},
          quantity: ${purchaseRequest.quantity},
          buyDate: ${purchaseRequest.buyDate.getTime()},
          ingredientType: "${purchaseRequest.ingredientType}"
        }
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function updateIngredientTypeRequest(ingredientRequest: IIngredientRequest, id: string) {
  const mutation = `
    mutation {
      updateIngredient (
        fmiData: {
          id: "${id}"
          title: "${ingredientRequest.title}",
          unit: "${ingredientRequest.unit}",
        }
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function deleteIngredientType( id: string): Promise<any> {
  const mutation = `
    mutation {
      deleteIngredient (
        id: "${id}"
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function deletePurchase( id: string): Promise<any> {
  const mutation = `
    mutation {
      deletePurchase (
        id: "${id}"
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}
