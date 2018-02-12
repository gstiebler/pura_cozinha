import { Kitchen } from '../../db/models/kitchen';
import { MenuItem } from '../../db/models/menuItem';
import { idByValue } from '../lib/TestUtils';

export default async () => {
  return [
    {
      name: 'Cozinha do Marcel',
      address: 'R. Jorn. Henrique Cordeiro, 310',
      coordinates: {
        lat: -23.005238,
        lng: -43.321984
      },
      phoneNumber: '234-5697',
      telegramUsernames: ['marcel'],
      active: true,
      stock: [
        {
          menu_item: await idByValue(MenuItem, 'title', 'Sanduba de frango'),
          quantity: 8.0
        },
        {
          menu_item: await idByValue(MenuItem, 'title', 'Açai'),
          quantity: 0.0
        },
        {
          menu_item: await idByValue(MenuItem, 'title', 'Sanduíche de Mignon'),
          quantity: 7.0
        }
      ]
    },
    {
      name: 'Outra cozinha',
      address: 'Rua Barata Ribeiro, 419',
      coordinates: {
        lat: -22.968896,
        lng: -43.186143
      },
      phoneNumber: '+55 21 99401-1944',
      telegramUsernames: ['gstiebler'],
      active: true,
      stock: [
        {
          menu_item: await idByValue(MenuItem, 'title', 'Sanduba de frango'),
          quantity: 2.0
        },
        {
          menu_item: await idByValue(MenuItem, 'title', 'Sanduíche de Mignon'),
          quantity: 17.0
        }
      ]
    },
    {
      name: 'Cozinha Centro',
      address: 'Av. Mal. Floriano, 71',
      coordinates: {
        lat: -22.901411,
        lng: -43.183318
      },
      phoneNumber: '99999-8888',
      telegramUsernames: ['jose'],
      active: false,
      stock: [
        {
          menu_item: await idByValue(MenuItem, 'title', 'Sanduba de frango'),
          quantity: 2.0
        },
        {
          menu_item: await idByValue(MenuItem, 'title', 'Açai'),
          quantity: 5.0
        },
        {
          menu_item: await idByValue(MenuItem, 'title', 'Sanduíche de Mignon'),
          quantity: 20.0
        }
      ]
    },
    {
      name: 'coffee_shop',
      address: 'Praça',
      coordinates: {
        lat: -22.901411,
        lng: -43.183318
      },
      phoneNumber: '99999-8888',
      telegramUsernames: ['gstiebler'],
      active: true,
      stock: []
    },
  ];
}
