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

  it('get ingredients', async () => {
    const store = new Store();
    await store.onIngredientsPageLoad();
    expect(store.ingredients[0].title).to.equal('Carne moída');
    expect(store.ingredients[1].title).to.equal('Leite');
    expect(store.ingredients[2].title).to.equal('Seleta de Legumes');
  });

  it('create ingredient', async () => {
    const store = new Store();
    await store.onIngredientsPageLoad();
    store.ingredientTitleChanged('Tomate');
    store.unitSelected('CX');
    await store.onSendIngredientRequested();

    const ingredients = await IngredientType.find().sort({_id:-1}).limit(1);
    const lastIngredient = ingredients[0];
    expect(lastIngredient.title).to.equal('Tomate');
  });

  it('edit ingredient', async () => {
    const store = new Store();
    await store.onIngredientsPageLoad();
    const ingredients = await IngredientType.find().sort({_id:-1}).limit(1);
    const lastIngredient = ingredients[0];
    expect(lastIngredient.title).to.equal('Tomate');
    await store.findIngredientById(lastIngredient._id);
    store.ingredientTitleChanged('Suco de tomate');
    store.unitSelected('L');
    await store.onUpdateIngredientRequested();

    const updatedIngredients = await IngredientType.find().sort({_id:-1}).limit(1);
    const lastIngredientUpdated = updatedIngredients[0];
    expect(lastIngredientUpdated.title).to.equal('Suco de tomate');
    expect(lastIngredientUpdated.unit).to.equal('L');
  });

  it('delete ingredient', async () => {
    const store = new Store();
    await store.onIngredientsPageLoad();
    const ingredients = await IngredientType.find({title: 'Suco de tomate'}).limit(1);
    const tmp = ingredients[0];
    expect(tmp.title).to.equal('Suco de tomate');
    await store.findIngredientById(tmp._id);
    await store.onDeleteIngredientRequested();

    const deletedIngredient = IngredientType.find({title: 'Suco de tomate'}).limit(1)[0];
    expect(deletedIngredient).to.equal(undefined);
  });

});