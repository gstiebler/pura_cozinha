
class Model {

  getFoodMenu() {
    return [
        {
            title: 'Sanduiche de frango',
            description: 'Muito gostoso, feito com frango desfiado'
        },
        {
            title: 'Sanduiche de mignon',
            description: 'Feito com o melhor file mignon da cidade, bem passado. Os bois ' +
                'foram muito bem tratados.'
        },
        {
            title: 'Açai',
            description: 'Açai batido com banana e morango, vem cheião.'
        },
        ];
  }

}

const model = new Model();
export default model;