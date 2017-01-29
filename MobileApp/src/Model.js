
class Model {

  getFoodMenu() {
    return [
        {
            title: 'Sanduiche de frango',
            description: 'Muito gostoso, feito com frango desfiado'
        },
        {
            title: 'Sanduiche de mignon',
            description: 'Feito com o melhor file mignon da cidade, bem passado'
        },
        {
            title: 'Acai',
            description: 'Acao batido com banana e morango, vem cheiao'
        },
        ];
  }

}

const model = new Model();
export default model;