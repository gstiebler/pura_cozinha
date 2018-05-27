import * as network from './network';
import { IngredientType } from '../server/src/db/models/IngredientType';

export async function findKitchenById(kitchenId: string): Promise<any> {
    const params = `
      id: "${kitchenId}"
    `;
    const fields = [
      '_id',
      'name',
      'address',
      'active',
      'stock { menu_item, quantity }'
    ];
    
    const query = `query { kitchen( ${params} ) { ${fields} }  }`;
    const result = await network.fetchQuery(query);
    return result.kitchen;
  }
  
  export async function getItemsByKitchen(kitchenId: string): Promise<any> {
    const params = `
      kitchen_id: "${kitchenId}"
    `;
    const fields = [
      '_id',
      'title',
      'description',
      'price',
      'imgURL',
      'boolOptions { label,  key }', 
      'options { key, label, optionItems { key, label, price } }', 
    ];
    const fieldsStr = fields.join(', ');
    const query = `
      query { 
        fullMenuItemsByKitchen( kitchen_id: "${kitchenId}" ) {
          _id,
          title,
          description,
          price,
          imgURL,
          boolOptions { label, key, price }, 
          options { 
            key, 
            label, 
            optionItems { key, label, price } 
          }, 
        } 
      }
    `;
    const result = await network.fetchQuery(query);
    return result.fullMenuItemsByKitchen;
  }


export async function findIngredientTypeById(id: string): Promise<IngredientType> {
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