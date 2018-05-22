import { expect } from 'chai';
import * as sinon from 'sinon';
import * as Twitter from '../../../server/src/lib/Twitter';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import { IngredientType } from '../../../server/src/db/models/IngredientType';
import { Purchase } from '../../../server/src/db/models/Purchase';
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
    const lastIngredient = ingredients[0].toObject();
    expect(lastIngredient.title).to.equal('Tomate');
  });

  it('edit ingredient', async () => {
    const store = new Store();
    await store.onIngredientsPageLoad();
    const ingredients = await IngredientType.find().sort({_id:-1}).limit(1);
    const lastIngredient = ingredients[0].toObject();
    expect(lastIngredient.title).to.equal('Tomate');
    await store.findIngredientById(lastIngredient._id);
    store.ingredientTitleChanged('Suco de tomate');
    store.unitSelected('L');
    await store.onUpdateIngredientRequested();

    const updatedIngredients = await IngredientType.find().sort({_id:-1}).limit(1);
    const lastIngredientUpdated = updatedIngredients[0].toObject();
    expect(lastIngredientUpdated.title).to.equal('Suco de tomate');
    expect(lastIngredientUpdated.unit).to.equal('L');
  });

  it('delete ingredient', async () => {
    const store = new Store();
    await store.onIngredientsPageLoad();
    const ingredients = await IngredientType.find({title: 'Suco de tomate'}).limit(1);
    const tmp = ingredients[0].toObject();
    expect(tmp.title).to.equal('Suco de tomate');
    await store.findIngredientById(tmp._id);
    await store.onDeleteIngredientRequested();

    const deletedIngredient = IngredientType.find({title: 'Suco de tomate'}).limit(1)[0];
    expect(deletedIngredient).to.equal(undefined);
  });

  it('get purchases', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    expect(store.purchases[0].quantity).to.equal(3);
    expect(store.purchases[1].quantity).to.equal(1);
  });

  it('get purchase ingredient type', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    const pIngredientType1 = store.getPurchaseIngredientType(store.purchases[0].ingredientType.id);
    expect(pIngredientType1.title).to.equal('Carne moída');

    const pIngredientType2 = store.getPurchaseIngredientType(store.purchases[1].ingredientType.id);
    expect(pIngredientType2.title).to.equal('Seleta de Legumes');
  });

  it('create purchase', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    store.ingredientTypeSelected(store.ingredients[0]._id);
    store.onItemQtyIncreased();
    store.onItemQtyIncreased();
    store.valueChanged('56.5');
    store.addNewPurchase();
    await store.onSendPurchaseRequested();

    const purchases = await Purchase.find().sort({_id:-1}).limit(1);
    const lastPurchase = purchases[0].toObject();
    expect(lastPurchase.value).to.equal(56.5);
    expect(lastPurchase.ingredientType.id).to.equal(store.ingredients[0]._id);
    expect(lastPurchase.quantity).to.equal(2);
  });

  it('delete purchase', async () => {
    const store = new Store();
    const purchases = await Purchase.find({value: 56.5}).limit(1);
    const tmp = purchases[0].toObject();
    expect(tmp.value).to.equal(56.5);
    await store.findPurchaseById(tmp._id);
    await store.onDeletePurchaseRequested();

    const deletedPurchase = await Purchase.find({value: 56.5}).limit(1)[0];
    expect(deletedPurchase).to.equal(undefined);
  });
});