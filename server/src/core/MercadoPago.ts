import { fetchSync } from '../lib/NetworkUtils';

const publicKey =  process.env.MP_PUBLIC_KEY;
const accessToken = 'access_token=' + process.env.MP_ACCESS_TOKEN;

export async function execPay(ctoken: string, amount: number, desc: string) {
  const body = {
    description: desc,
    transaction_amount: amount,
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
      'public_key': publicKey,
    },
    body: JSON.stringify(body)
  };

  const url = 'https://api.mercadopago.com/v1/payments?public_key=' + publicKey + '&' + accessToken;
  return await fetchSync(url, options);
}


