import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import * as Payment from '../core/Payment';
import * as MercadoPago from '../core/MercadoPago';

describe('Payment tests', function () {

  beforeEach(async function () {
    await execFixtures();
  });

  it('Mercado Pago', async function() {
    return MercadoPago.first();
  });

  it('Create credit card', async function () {
    const cardDetails = {
      'type': 'visa',
      'number': '4417119669820331',
      'expire_month': '11',
      'expire_year': '2019',
      'cvv2': '123',
      'first_name': 'Joe',
      'last_name': 'Shopper'
    };

    const savedCard = await Payment.createCC(cardDetails);
    assert.ok(savedCard.id.includes('CARD-'));
  });


  it('Payment with saved credit card', async function () {
    const cardDetails = {
      'type': 'visa',
      'number': '4417119669820331',
      'expire_month': '11',
      'expire_year': '2019',
      'cvv2': '123',
      'first_name': 'Joe',
      'last_name': 'Shopper'
    };
    const savedCard = await Payment.createCC(cardDetails);
    const cardId = savedCard.id;
    try {
      const paymentRes = await Payment.payWithSavedCard(cardId, 8.99, 'acai gostoso');
      console.log(JSON.stringify(paymentRes));
    } catch (err) {
      console.error(err);
      assert.ok(false);
    }
  });

  it('Pay with new credit card', async function () {
    const creditCardInfo = {
      'type': 'visa',
      'number': '4417119669820331',
      'expire_month': '11',
      'expire_year': '2018',
      'cvv2': '874',
      'first_name': 'Joe',
      'last_name': 'Shopper',
      /*'billing_address': {
        'line1': '52 N Main ST',
        'city': 'Johnstown',
        'state': 'OH',
        'postal_code': '43210',
        'country_code': 'US'
      }*/
    };

    try {
      const res = await Payment.payCreditCard(creditCardInfo, 8.99, 'teste compra cartão');
      console.log(res);
    } catch (err) {
      console.error(JSON.stringify(err));
      assert.ok(false);
    }
  });
});
