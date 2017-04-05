import { Kitchen } from '../../db/models/kitchen';
import { MenuItem } from '../../db/models/menuItem';
import { idByValue } from '../lib/TestUtils';

export default async function execute() {
  await Kitchen.collection.insert([
    {
      name: 'Cozinha do Marcel',
      address: 'R. Jorn. Henrique Cordeiro, 310',
      coordinates: {
        lat: -23.005238,
        lng: -43.321984
      },
      phone_number: '234-5697',
      telegram_username: 'marcel',
      active: 'YES',
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
      phone_number: '+55 21 99401-1944',
      telegram_username: 'gstiebler',
      active: 'YES',
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
      phone_number: '99999-8888',
      telegram_username: 'jose',
      active: 'NO',
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
  ]);
}