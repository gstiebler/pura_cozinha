import { IngredientType } from '../../db/models/IngredientType';
import { idByValue } from '../lib/TestUtils';

export default async (): Promise<IngredientType[]> => {
  return [
    {
      title: 'Carne moída',
      unit: 'KG',
    },
    {
      title: 'Leite',
      unit: 'L',
    },
    {
      title: 'Seleta de Legumes',
      unit: 'CX',
    }
  ];
}
