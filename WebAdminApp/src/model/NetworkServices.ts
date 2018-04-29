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