import * as fetch from 'node-fetch';

const pk = 'public_key=TEST-947b1369-9810-411f-9afe-67a31c411f37';
const at = 'access_token=TEST-2939849420189802-051115-01e9077f122bcdbe9460fe04420671d0__LA_LC__-82570970';

function fetchSync(url, options): Promise<any> {
  return new Promise((accept, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        accept(json);
      })
      .catch(err => { reject(err); });
  });
}

export async function cardToken() {

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

  const optionsp = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    },
    body: JSON.stringify(bodyp)
  };

  const urlp = 'https://api.mercadopago.com/v1/card_tokens/?' + pk;

  const res = await fetchSync(urlp, optionsp);
  console.log('first token' + JSON.stringify(res));
  return await getRealToken(res.id);
}

async function getRealToken(tokenp) {
  const body = {
    card_number: '4509953566233704',
    security_code: '123',
    expiration_month: 12,
    expiration_year: 2020,
    cardholder: {
      name: 'APRO',
      identification: {
        number: '05533146709',
        type: 'CPF'
      }
    },
    device: {
      meli: {
        session_id: tokenp
      }
    }
  };

  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  };

  const url2 = 'https://api.mercadopago.com/v1/card_tokens/' + tokenp + '?' + pk;

  return await fetchSync(url2, options);
}

export async function execPay(ctoken) {
  const body = {
    description: 'TESTE',
    transaction_amount: 10.0,
    token: ctoken,
    statement_descriptor: 'teste',
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

  const url = 'https://api.mercadopago.com/v1/payments?' + pk + '&' + at;
  return await fetchSync(url, options);
}


