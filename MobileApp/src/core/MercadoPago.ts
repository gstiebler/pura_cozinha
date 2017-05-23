import { fetchSync } from '../lib/NetworkUtils';

const publicKey = 'TEST-947b1369-9810-411f-9afe-67a31c411f37';
const headers = {
  'content-type': 'application/x-www-form-urlencoded',
  'accept': 'application/json'
};

export interface CreditCardInfo {
  cardNumber: string;
  securityCode: string;
  expirationMonth: number;
  expirationYear: number;
  cardHolderName: string;
}

export async function cardToken(cc_info: CreditCardInfo) {

  const bodyp = {
    card_number: null,
    security_code: null,
    expiration_month: null,
    expiration_year: null,
    cardholder: {
      name: null,
      identification: {
        number: null,
        type: null
      }
    }
  };

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyp)
  };

  const urlp = 'https://api.mercadopago.com/v1/card_tokens/?public_key=' + publicKey;

  const res = await fetchSync(urlp, options);
  const realToken = await getRealToken(res.id, cc_info);
  if (realToken.status !== 'active') {
    throw new Error('problem getting card token');
  }
  return realToken;
}

async function getRealToken(tokenp: string, cc_info: CreditCardInfo) {
  const body = {
    card_number: cc_info.cardNumber,
    security_code: cc_info.securityCode,
    expiration_month: cc_info.expirationMonth,
    expiration_year: cc_info.expirationYear,
    cardholder: {
      name: cc_info.cardHolderName,
      /* identification: {
        number: cc_info.cpf,
        type: 'CPF'
      }*/
    },
    device: {
      meli: {
        session_id: tokenp
      }
    }
  };

  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  };
  const url2 = 'https://api.mercadopago.com/v1/card_tokens/' + tokenp + '?public_key=' + publicKey;
  const result = await fetchSync(url2, options);
  return result;
}