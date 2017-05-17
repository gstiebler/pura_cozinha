import { fetchSync } from '../lib/NetworkUtils';

const publicKey = 'public_key=' + process.env.MP_PUBLIC_KEY;
const accessToken = 'access_token=' + process.env.MP_ACCESS_TOKEN;

export async function execPay(ctoken: string, amount: number, desc: string) {
  const body = {
    description: desc,
    transaction_amount: 10.0,
    token: ctoken,
    statement_descriptor: desc,
    payment_method_id: 'visa',
    installments: 1,
    payer: {
      email: 'test_user_19653727@testuser.com'
    },
  };

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json',
      'public_key': 'TEST-947b1369-9810-411f-9afe-67a31c411f37',
    },
    body: JSON.stringify(body)
  };

  const url = 'https://api.mercadopago.com/v1/payments?' + publicKey + '&' + accessToken;
  return await fetchSync(url, options);
}


