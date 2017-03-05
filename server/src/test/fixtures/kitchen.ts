import { Kitchen } from '../../db/kitchen';

export default async function execute() {
  var kitchen = new Kitchen({
    name: 'Cozinha do Marcel',
    address: 'Endereço',
    coordinates: { lat: 39573.3457, lng: 87347 }
  });
  await kitchen.save();
}