
class Model {

  getFoodMenu() {
    return [
        {
            title: 'Sanduiche de frango',
            description: 'Muito gostoso, feito com frango desfiado',
            price: 12.39
        },
        {
            title: 'Sanduiche de mignon',
            description: 'Feito com o melhor file mignon da cidade, bem passado. Os bois ' +
                'foram muito bem tratados.',
            price: 15.99
        },
        {
            title: 'Açai',
            description: 'Açai batido com banana e morango, vem cheião.',
            price: 14.00
        },
        ];
  }

}

const model = new Model();
export default model;