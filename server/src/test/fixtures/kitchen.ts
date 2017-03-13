import { Kitchen } from '../../db/models/kitchen';

export default async function execute() {
  await Kitchen.collection.insert([
    {
      name: 'Cozinha do Marcel',
      address: 'Endereço',
      coordinates: { lat: 39573.3457, lng: 87347 }
    },
    {
      name: 'Outra cozinha',
      address: 'Rua bem central',
      coordinates: { lat: 12.34, lng: -57.34 }
    },
  ]);
}