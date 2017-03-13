import { MenuItem } from '../../db/models/menuItem';

export default async function execute() {
  await MenuItem.collection.insert([
    {
      name: 'Sanduba de frango',
      value: 11.99,
      imgURL: 'http://mms.businesswire.com/media/20151023005022/en/492519/4/Classic_Ultimate_Chicken_Sandwich.jpg'
    },
    {
      name: 'Açai',
      value: 8.00,
      imgURL: 'http://www.mundoboaforma.com.br/wp-content/uploads/2015/04/Acai-na-Tigela-500x330.jpg'
    },
  ]);
}