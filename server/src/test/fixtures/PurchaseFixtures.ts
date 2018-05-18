import { Purchase } from '../../db/models/Purchase';
import { IngredientType } from '../../db/models/IngredientType';
import { idByValue } from '../lib/TestUtils';

export default async () => {
  return [
    {
      quantity: 3,
      value: 22.5,
      buyDate: new Date('2018-01-02'),
      createdAt: new Date(),
      ingredientType:{
        id: await idByValue(IngredientType, 'title', 'Carne moída'),
      }
    },
    {
      quantity: 1,
      value: 1.20,
      buyDate: new Date('2018-01-02'),
      createdAt: new Date(),
      ingredientType:{
        id: await idByValue(IngredientType, 'title', 'Seleta de Legumes'),
      }
    }
  ];
}
