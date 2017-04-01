import * as  paypal from 'paypal-rest-sdk';

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
});

interface CreditCard {
  type: string;
  number: string;
  expire_month: string;
  expire_year: string;
  cvv2: string;
  first_name: string;
  last_name: string;
}

export function createCC(savedCard: CreditCard): Promise<any> {
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


function paySync(paymentInfo): Promise<any> {
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
          'credit_card_id': ccId
        }
      }]
    },
    'transactions': [{
      'amount': {
        'currency': 'BRL',
        'total': value.toString()
      },
      'description': description
    }]
  };

  return await paySync(paymentInfo);
}

export async function payCreditCard(creditCard: CreditCard, value: Number, description: string) {
  const paymentInfo = {
    'intent': 'sale',
    'payer': {
      'payment_method': 'credit_card',
      'funding_instruments': [{
        'credit_card': creditCard
      }]
    },
    'transactions': [{
      'amount': {
        'total': value.toString(),
        'currency': 'BRL',
      },
      'description': description
    }]
  };

  return await paySync(paymentInfo);
}