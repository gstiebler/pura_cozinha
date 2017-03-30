import * as  paypal from 'paypal-rest-sdk';

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
});

export function createCC(savedCard): Promise<any> {
  return new Promise((resolve, reject) => {
    paypal.creditCard.create(savedCard, function (error, credit_card) {
      if (error) {
        reject(error);
      } else {
        resolve(credit_card);
      }

    });
  });
}


function payWithSavedCardSync(paymentInfo): Promise<any> {
  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentInfo, function (error, payment) {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
}

export async function payWithSavedCard(ccId: string, value: Number, description: string) {
  const paymentInfo = {
    'intent': 'sale',
    'payer': {
      'payment_method': 'credit_card',
      'funding_instruments': [{
        'credit_card_token': {
          'credit_card_id': 'CARD-5BT058015C739554AKE2GCEI' // ccId
        }
      }]
    },
    'transactions': [{
      'amount': {
        'currency': 'USD',
        'total': value.toString()
      },
      'description': description
    }]
  };

  return await payWithSavedCardSync(paymentInfo);
}

export async function pay() {
  const savedCard = {
    'type': 'visa',
    'number': '4417119669820331',
    'expire_month': '11',
    'expire_year': '2019',
    'cvv2': '123',
    'first_name': 'Joe',
    'last_name': 'Shopper'
  };

  try {
    const res = await createCC(savedCard);
    return res;
  } catch (err) {
    console.error(JSON.stringify(err));
  }
}