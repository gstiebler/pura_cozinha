import { Ingredient } from '../../db/models/Ingredient';
import { idByValue } from '../lib/TestUtils';
import { Unit } from '../../db/models/Unit';

export default async (): Promise<Ingredient[]> => {
  return [
    {
      title: 'Carne moída',
      amount: 2,
      unit: {
        id: await idByValue(Unit, 'title', 'Kilos (Kg)'),
      },
    },
    {
      title: 'Leite',
      amount: 5,
      unit: {
        id: await idByValue(Unit, 'title', 'Litros (l)'),
      },
    },
    {
      title: 'Seleta de Legumes',
      amount: 8,
      unit: {
        id: await idByValue(Unit, 'title', 'Caixas (cx)'),
      },
    }
  ];
}
