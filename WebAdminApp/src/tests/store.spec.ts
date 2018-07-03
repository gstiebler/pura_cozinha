import { expect } from 'chai';
import * as sinon from 'sinon';
import * as Twitter from '../../../server/src/lib/Twitter';
import { Store } from '../model/Store';
import * as adminNs  from '../model/NetworkServices';
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
    expect(store.purchases[3].quantity).to.equal(3);
    expect(store.purchases[2].quantity).to.equal(2);
  });


  it('get purchase ingredient type', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    const pIngredientType1 = store.getPurchaseIngredientType(store.purchases[3].ingredientType);
    expect(pIngredientType1.title).to.equal('Carne moída');

    const pIngredientType2 = store.getPurchaseIngredientType(store.purchases[2].ingredientType);
    expect(pIngredientType2.title).to.equal('Seleta de Legumes');
  });


  it('check purchases count', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    store.ingredientTypeSelected(store.ingredients[0]._id);
    store.buyDateChanged(new Date('2018-03-18'));
    //1 purchase to list
    store.valueChanged('10');
    store.quantityChanged('3');
    store.addNewPurchase();
    //2 purchase to list
    store.valueChanged('10');
    store.quantityChanged('3');
    store.addNewPurchase();
    //3 purchase to list
    store.valueChanged('10');
    store.quantityChanged('3');
    store.addNewPurchase();
    //4 purchase to list
    store.valueChanged('10');
    store.quantityChanged('3');
    store.addNewPurchase();
    //5 purchase to list
    store.valueChanged('10');
    store.quantityChanged('3');
    store.addNewPurchase();
    //6 purchase to list
    store.valueChanged('10');
    store.quantityChanged('3');
    store.addNewPurchase();
    //7 purchase to list
    store.valueChanged('10');
    store.quantityChanged('3');
    store.addNewPurchase();
    await store.onSendPurchaseRequested();
    const purchasesCount = await adminNs.countPurchases();
    expect(purchasesCount).to.equal(11); //4 initiated in fixtures, 7 more in this test
  });

  it('check purchases infinite scrolling', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    expect(store.purchases.length).to.equal(8);
    expect(store.hasMore).to.equal(true);
    
    await store.fetchMorePurchasesData();
    expect(store.purchases.length).to.equal(11);

    await store.fetchMorePurchasesData();
    expect(store.hasMore).to.equal(false);
  });

  it('create purchase', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    store.ingredientTypeSelected(store.ingredients[0]._id);
    store.quantityChanged('3');
    store.valueChanged('56.5');
    store.buyDateChanged(new Date('2018-03-18'));
    store.addNewPurchase();
    await store.onSendPurchaseRequested();

    const purchases = await Purchase.find().sort({_id:-1}).limit(1);
    const lastPurchase = purchases[0].toObject();
    expect(lastPurchase.value).to.equal(56.5);
    const d2 = new Date('2018-03-18');
    expect(lastPurchase.buyDate.getTime()).to.equal(d2.getTime());
    expect(lastPurchase.ingredientType+'').to.equal(store.ingredients[0]._id);
    expect(lastPurchase.quantity).to.equal(3);
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

  it('check purchase total amount update', async () => {
    const store = new Store();
    await store.onPurchasesPageLoad();
    store.ingredientTypeSelected(store.ingredients[0]._id);
    store.buyDateChanged(new Date('2018-03-18'));

    //1 purchase to list
    store.valueChanged('10');
    store.addNewPurchase();
    //2 purchase to list
    store.valueChanged('12');
    store.addNewPurchase();
    //3 purchase to list
    store.valueChanged('9');
    store.addNewPurchase();
    //4 purchase to list
    store.valueChanged('12');
    store.addNewPurchase();
    
    expect(store.totalAmount).to.equal(43);

    const key1 = store.newPurchases[0].key;
    const key2 = store.newPurchases[1].key;
    store.removeFromNewPurchases(key1);
    store.removeFromNewPurchases(key2);

    expect(store.totalAmount).to.equal(21);
  });
});