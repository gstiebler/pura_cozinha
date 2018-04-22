import * as network from './network';

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
      'boolOptions {  label,  key  }', 
      'options { key, label, optionItems { key,  label } }', 
    ];
    const fieldsStr = fields.join(', ');
    const query = `query { fullMenuItemsByKitchen( ${params} ) { ${fieldsStr} } }`;
    const result = await network.fetchQuery(query);
    return result.fullMenuItemsByKitchen;
  }