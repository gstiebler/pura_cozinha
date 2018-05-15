import { expect } from 'chai';
import * as sinon from 'sinon';
import * as Twitter from '../../../server/src/lib/Twitter';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import { IngredientType } from '../../../server/src/db/models/IngredientType';
import * as logger from 'winston';

describe('admin web app store', () => {

  before(async () => {
    await initFixtures();
  });

  beforeEach(() => {
    //twitterSendMessageStub.returns(null);
  })

  afterEach(() => {
    // twitterSendMessageStub.restore();
  })

//   it('get ingredients', async () => {
//     const store = new Store();
//     await store.onIngredientsPageLoad();
//     expect(store.ingredients[0].title).to.equal('Carne moída');
//     expect(store.ingredients[1].title).to.equal('Leite');
//     expect(store.ingredients[2].title).to.equal('Seleta de Legumes');
//   });

//   it('create ingredient', async () => {
//     const store = new Store();
//     await store.onIngredientsPageLoad();
//     store.ingredientTitleChanged('Tomate');
//     store.unitSelected(store.units[0]._id);
//     await store.onSendIngredientRequested();

//     const ingredients = await Ingredient.find().sort({_id:-1}).limit(1);
//     const lastIngredient = ingredients[0];
//     expect(lastIngredient.title).to.equal('Tomate');
//     expect(lastIngredient.amount).to.equal(2);
//   });

//   it('edit ingredient', async () => {
//     const store = new Store();
//     await store.onIngredientsPageLoad();
//     const ingredients = await Ingredient.find().sort({_id:-1}).limit(1);
//     const lastIngredient = ingredients[0];
//     expect(lastIngredient.title).to.equal('Tomate');
//     await store.findIngredientById(lastIngredient._id);
//     store.ingredientTitleChanged('Suco de tomate');
//     store.ingredientAmountChanged('1');
//     store.unitSelected(store.units[1]._id); //Litros
//     await store.onUpdateIngredientRequested();

//     const updatedIngredients = await Ingredient.find().sort({_id:-1}).limit(1);
//     const lastIngredientUpdated = updatedIngredients[0];
//     expect(lastIngredientUpdated.title).to.equal('Suco de tomate');
//     expect(lastIngredientUpdated.amount).to.equal(1);
//     expect(lastIngredientUpdated.unit.id).to.equal(store.units[1]._id);
//   });

//   it('delete ingredient', async () => {
//     const store = new Store();
//     await store.onIngredientsPageLoad();
//     const ingredients = await Ingredient.find().sort({_id:-1}).limit(1);
//     const lastIngredient = ingredients[0];
//     expect(lastIngredient.title).to.equal('Suco de tomate');
//     await store.findIngredientById(lastIngredient._id);
//     await store.onDeleteIngredientRequested();

//     const updatedIngredients = await Ingredient.find().sort({_id:-1}).limit(1);
//     const lastIngredientUpdated = updatedIngredients[0];
//     expect(lastIngredientUpdated.title).to.not.equal('Suco de tomate');
//   });

});