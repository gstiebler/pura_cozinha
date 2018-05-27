import * as network from '../../../common/network';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IIngredientRequest,
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';
import { IngredientType } from '../../../server/src/db/models/IngredientType';
import { ObjectID } from 'bson';

export async function fetchIngredientTypes(): Promise<IngredientType[]> {
  const query = `
    query {
      allIngredients { 
        _id, 
        title,
        unit 
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.allIngredients;
}

export async function findIngredientTypeById(id: string): Promise<IngredientType[]> {
  const query = `
    query {
      ingredient (id: "${id}") {
        _id, 
        title,
        unit 
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.ingredient;
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
