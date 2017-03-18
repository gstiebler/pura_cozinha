import { MenuItem } from '../../db/models/menuItem';

export default async function execute() {
  await MenuItem.collection.insert([
    {
      title: 'Sanduba de frango',
      description: 'Muito gostoso, feito com frango desfiado',
      price: 11.99,
      imgURL: 'http://mms.businesswire.com/media/20151023005022/en/492519/4/Classic_Ultimate_Chicken_Sandwich.jpg'
    },
    {
      title: 'Açai',
      description: 'Açai batido com banana e morango, vem cheião.',
      price: 8.00,
      imgURL: 'http://www.mundoboaforma.com.br/wp-content/uploads/2015/04/Acai-na-Tigela-500x330.jpg'
    },
  ]);
}