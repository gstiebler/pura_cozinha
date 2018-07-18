import { Purchase } from '../../db/models/Purchase';
import { IngredientType } from '../../db/models/IngredientType';
import { idByValue } from '../lib/TestUtils';

export default async () => {
  return [
    {
      quantity: 3,
      value: 22.5,
      buyDate: new Date('2018-01-02T00:00:00'),
      createdAt: new Date(),
      ingredientType: await idByValue(IngredientType, 'title', 'Carne moída'),
    },
    {
      quantity: 2,
      value: 1.20,
      buyDate: new Date('2018-01-02T00:00:01'),
      createdAt: new Date(),
      ingredientType: await idByValue(IngredientType, 'title', 'Seleta de Legumes'),
    },
    {
      quantity: 13,
      value: 5,
      buyDate: new Date('2018-02-10'),
      createdAt: new Date(),
      ingredientType: await idByValue(IngredientType, 'title', 'Seleta de Legumes'),
    },
    {
      quantity: 10,
      value: 1.20,
      buyDate: new Date('2018-01-02T00:00:02'),
      createdAt: new Date(),
      ingredientType: await idByValue(IngredientType, 'title', 'Leite'),
    },
    {
      quantity: 10,
      value: 200,
      buyDate: new Date('2018-01-02T00:00:03'),
      createdAt: new Date(),
      ingredientType: await idByValue(IngredientType, 'title', 'Filé Mignon'),
    },
    {
      quantity: 10,
      value: 20,
      buyDate: new Date('2018-01-02T00:00:04'),
      createdAt: new Date(),
      ingredientType: await idByValue(IngredientType, 'title', 'Açaí'),
    },
    {
      quantity: 10,
      value: 100,
      buyDate: new Date('2018-01-02T00:00:05'),
      createdAt: new Date(),
      ingredientType: await idByValue(IngredientType, 'title', 'Peito de Frango'),
    }
  ];
}
