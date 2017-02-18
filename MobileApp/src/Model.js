
const menuItemFixture = [
  {
    id: 34,
    title: 'Sanduiche de frango',
    description: 'Muito gostoso, feito com frango desfiado',
    price: 12.39
  },
  {
    id: 97,
    title: 'Sanduiche de mignon',
    description: 'Feito com o melhor file mignon da cidade, bem passado. Os bois ' +
        'foram muito bem tratados.',
    price: 15.99
  },
  {
    id: 609,
    title: 'Açai',
    description: 'Açai batido com banana e morango, vem cheião.',
    price: 14.00
  },
];

class Model {

  getFoodMenu() {
    return menuItemFixture;
  }

  getFoodMenuItemById(menuItemId) {
    return menuItemFixture.find(item => item.id == menuItemId);
  }

}

const model = new Model();
export default model;