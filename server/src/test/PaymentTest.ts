import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import * as Payment from '../core/Payment';
import * as MercadoPago from '../core/MercadoPago';


import * as mock from 'mock-require';
mock('../MobileApp/lib/NetworkUtils', '../lib/NetworkUtils');

/*mock('../MobileApp/lib/NetworkUtils', { fetchSync: function(a, b) {
  console.log('NetworkUtils called');
}});*/
import * as MercadoPagoRN from '../MobileApp/core/MercadoPago';

describe('Payment tests', function () {

  beforeEach(async function () {
    await execFixtures();
  });

  it('Mercado Pago', async function() {
    const cc_info: MercadoPagoRN.CreditCardInfo = {
      cardNumber: '4509953566233704',
      securityCode: '123',
      expirationMonth: 12,
      expirationYear: 2020,
      cardHolderName: 'Joe Doe'
      // cpf: '05533146709'
    };
    const cardToken = await MercadoPagoRN.cardToken(cc_info);
    // console.log('second token' + JSON.stringify(cardToken));
    const payRes = await MercadoPago.execPay(cardToken.id, 10.0, 'descrip');
    // console.log(payRes);
  });

});
