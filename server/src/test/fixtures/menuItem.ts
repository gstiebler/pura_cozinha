
import { idByValue } from '../lib/TestUtils';

export default async () => {
  return [
    {
      title: 'Sanduba de frango',
      description: 'Muito gostoso, feito com frango desfiado',
      price: 11.99,
      imgURL: 'http://mms.businesswire.com/media/20151023005022/en/492519/4/Classic_Ultimate_Chicken_Sandwich.jpg',
    },
    {
      title: 'Açai',
      description: 'Açai batido com banana e morango, vem cheião.',
      price: 8.00,
      imgURL: 'http://www.mundoboaforma.com.br/wp-content/uploads/2015/04/Acai-na-Tigela-500x330.jpg',
      boolOptions: [
        {
          key: 'GRANOLA',
          label: 'Granola',
          price: 2.00,
        }
      ],
    },
    {
      title: 'Sanduíche de Mignon',
      description: 'Melhor não tem',
      price: 15.00,
      imgURL: 'http://mms.businesswire.com/media/20151023005022/en/492519/4/Classic_Ultimate_Chicken_Sandwich.jpg',
      options: [
        {
          label: 'Molho',
          key: 'MOLHO',
          optionItems: [
            {
              label: 'Barbecue',
              key: 'BARBECUE',
              price: 1.00,
            },
            {
              label: 'Italiano',
              key: 'ITALIANO',
              price: 1.20,
            },
          ],
        }
      ],
    },
  ];
}