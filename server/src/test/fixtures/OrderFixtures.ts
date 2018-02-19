import { IOrder } from '../../db/models/Order';
import { idByValue } from '../lib/TestUtils';
import { MenuItem } from '../../db/models/menuItem';

export default async (): Promise<IOrder[]> => {
  return [
    {
      userId: 'userid',
      local: 'Prédio 1',
      localComplement: 'apt 101',
      status: 'PENDING',
      paymentOption: 'Dinheiro',
      telephoneNumber: '1234',
      totalAmount: 50.0,
      items: [
        {
          qty: 2,
          itemTotalPrice: 50.0,
          foodMenuItem: {
            id: await idByValue(MenuItem, 'title', 'Sanduba de frango'),
            title: 'Sanduba de frango',
            description: 'Muito bom',
            price: 25.0
          }
        }
      ]
    },
  ];
}
