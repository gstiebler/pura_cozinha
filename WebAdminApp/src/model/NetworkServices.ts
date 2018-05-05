import * as network from '../../../common/network';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IIngredientRequest,
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';
import { Ingredient } from '../../../server/src/db/models/Ingredient';
import { Unit } from '../../../server/src/db/models/Unit';
import { ObjectID } from 'bson';

export async function fetchIngredients(): Promise<Ingredient[]> {
  const query = `
    query {
      allIngredients { 
        _id, 
        title,
        amount, 
        unit { 
          id
        }
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.allIngredients;
}

export async function fetchUnits(): Promise<Unit[]> {
  const query = `
    query {
      allUnits { 
        _id, 
        title,
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.allUnits;
}


export async function findIngredientById(id: string): Promise<Unit[]> {
  const query = `
    query {
      ingredient (id: "${id}") { 
        title,
        amount,
        unit { 
          id
        }
      } 
    }
  `;
  const result = await network.fetchQuery(query);
  return result.ingredient;
}



export async function sendIngredientRequest(ingredientRequest: IIngredientRequest) {
  const mutation = `
    mutation {
      saveIngredient (
        fmiData: {
          title: "${ingredientRequest.title}",
          amount: ${ingredientRequest.amount}, 
          unit: { 
            id: "${ingredientRequest.unit}",
          }
        }
      ) 
    }
  `;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}

export async function findUnitById( id: string): Promise<any> {
  const params = `
    id: "${id}"
  `;
  const fields = [
    '_id',
    'title',
  ];
  
  const fieldsStr = fields.join(', ');
  const query = `query { unit( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.unit;
}