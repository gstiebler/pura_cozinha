import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import * as Payment from '../core/Payment';

describe('Payment tests', function () {

  beforeEach(async function () {
    await execFixtures();
  });

  it('Create credit card', async function () {
    const cardDetails = {
      "type": "visa",
      "number": "4417119669820331",
      "expire_month": "11",
      "expire_year": "2019",
      "cvv2": "123",
      "first_name": "Joe",
      "last_name": "Shopper"
    };

    const savedCard = await Payment.createCC(cardDetails);
    assert.ok(savedCard.id.includes('CARD-'));
  });


  it('Payment with saved credit card', async function () {
    const cardDetails = {
      "type": "visa",
      "number": "4417119669820331",
      "expire_month": "11",
      "expire_year": "2019",
      "cvv2": "123",
      "first_name": "Joe",
      "last_name": "Shopper"
    };
    const savedCard = await Payment.createCC(cardDetails);
    const cardId = savedCard.id;
    try {
      const paymentRes = await Payment.payWithSavedCard(cardId, 8.99, 'acai gostoso');
      console.log(JSON.stringify(paymentRes));
    } catch (err) {
      console.error(err);
    }
  });

  it('payment', async function () {
    const savedCard = await Payment.pay();
    assert.ok(savedCard.id.includes('CARD-'));
  });
});
