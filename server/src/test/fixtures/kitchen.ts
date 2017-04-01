import { Kitchen } from '../../db/models/kitchen';

export default async function execute() {
  await Kitchen.collection.insert([
    {
      name: 'Cozinha do Marcel',
      address: 'R. Jorn. Henrique Cordeiro, 310',
      coordinates: {
        lat: -23.005238,
        lng: -43.321984
      }
    },
    {
      name: 'Outra cozinha',
      address: 'Rua Barata Ribeiro, 419',
      coordinates: {
        lat: -22.968896,
        lng: -43.186143
      }
    },
    {
      name: 'Cozinha Centro',
      address: 'Av. Mal. Floriano, 71',
      coordinates: {
        lat: -22.901411,
        lng: -43.183318
      }
    },
  ]);
}