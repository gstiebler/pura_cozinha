import { IngredientType } from '../../db/models/IngredientType';
import { idByValue } from '../lib/TestUtils';

export default async () =>  {
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
    },
    {
      title: 'Açaí',
      unit: 'L',
    },
    {
      title: 'Filé Mignon',
      unit: 'KG',
    },
    {
      title: 'Peito de Frango',
      unit: 'KG',
    },
  ];
}
