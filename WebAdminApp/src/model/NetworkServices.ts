import * as network from '../../../common/network';
import { 
  TfmiId,
  FoodMenuItem,
  IOrderSummary,
  IOrderRequest,
} from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';
import { Ingredient } from '../../../server/src/db/models/Ingredient';

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