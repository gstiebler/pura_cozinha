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
      ],
      statusHistory: [],
      createdOn: new Date('2018-01-02'),
    },
    {
      userId: 'userid',
      local: 'Prédio 2',
      localComplement: 'apt 903',
      status: 'DELIVERED',
      paymentOption: 'Cartão',
      telephoneNumber: '94345',
      totalAmount: 48.0,
      items: [
        {
          qty: 2,
          itemTotalPrice: 48.0,
          foodMenuItem: {
            id: await idByValue(MenuItem, 'title', 'Sanduba de frango'),
            title: 'Sanduba de frango',
            description: 'Muito bom',
            price: 24.0
          }
        }
      ],
      statusHistory: [],
      createdOn: new Date('2018-01-03'),
    },
    {
      userId: 'userid',
      local: 'Prédio 2',
      localComplement: 'apt 903',
      status: 'DELIVERED',
      paymentOption: 'Cartão',
      telephoneNumber: '94345',
      totalAmount: 15.0,
      items: [
        {
          qty: 1,
          itemTotalPrice: 15.0,
          foodMenuItem: {
            id: await idByValue(MenuItem, 'title', 'Sanduíche de Mignon'),
            title: 'Sanduíche de Mignon',
            description: 'Melhor não tem',
            price: 15.0
          }
        }
      ],
      createdOn: new Date('2018-01-04'),
      statusHistory: [],
    },
    {
      userId: 'userid',
      local: 'Prédio 2',
      localComplement: 'apt 903',
      status: 'DELIVERED',
      paymentOption: 'Cartão',
      telephoneNumber: '94345',
      totalAmount: 8.0,
      items: [
        {
          qty: 1,
          itemTotalPrice: 8.0,
          foodMenuItem: {
            id: await idByValue(MenuItem, 'title', 'Açai'),
            title: 'Açai',
            description: 'Açai batido com banana e morango, vem cheião.',
            price: 8.0
          }
        }
      ],
      statusHistory: [],
      createdOn: new Date('2018-01-06'),
    },
  ];
}
