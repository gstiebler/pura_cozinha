const axios = require('axios');
var parseString = require('xml2js').parseString;

function param( params ) {
  
  const p = new URLSearchParams;
  for( const [ key, value ] of Object.entries( params ) ) {
      p.set( key, String( value ) );
  }
  return p.toString();
}


export async function getPaymentSessionId(): Promise<string>{
  const reqData = {
    'email': 'guilherme.mst@gmail.com',
    'token': '6D17B04C51F749EEA3F3ECE500FE01C1'
  };
  let sessionId = '';
  
  const response = await axios({
    method:'post',
    withCredentials: true,
    crossdomain: true,
    headers: { 
      "Content-Type" :"application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    responseType:'document',
    url:'https://ws.sandbox.pagseguro.uol.com.br/v2/sessions',
    data: param(reqData)
  });

  
  if(response.status === 200)
  {
    parseString(response.data, function (err, result) {
      
      sessionId = result.session.id[0];
    });
  }
  
  return sessionId;
};



export async function checkoutPayment(cardToken: string, senderHash: string): Promise<string>{

  console.log(cardToken);

  const reqData = {
    'email': 'guilherme.mst@gmail.com',
    'token': '7D9A6C8776404F359FB84455C794EE59',
    'paymentMode': 'default',
    'paymentMethod': 'creditCard',
    'receiverEmail': 'guilherme.mst@gmail.com',
    'currency': 'BRL',
    'extraAmount': '0.00',
    'itemId1': '0001',
    'itemDescription1': 'Hamburguer',
    'itemAmount1': '10.00',
    'itemQuantity1': 1,
    'notificationURL': 'https://sualoja.com.br/notifica.html',
    'reference': 'REF0001',
    'senderName': 'Nigel da Silva Lima',
    'senderCPF': '05575340384',
    'senderAreaCode': '98',
    'senderPhone': '983329436',
    'senderEmail': 'nigelnaiguel.comp@gmail.com',
    'senderHash': senderHash,
    'shippingAddressStreet': 'Av. Brig. Faria Lima',
    'shippingAddressNumber': '1384',
    'shippingAddressComplement': '5o andar',
    'shippingAddressDistrict': 'Jardim Paulistano',
    'shippingAddressPostalCode': '01452002',
    'shippingAddressCity': 'Sao Paulo',
    'shippingAddressState': 'SP',
    'shippingAddressCountry': 'BRA',
    'shippingType': 1,
    'shippingCost': '0.00',
    'creditCardToken': cardToken,
    'installmentQuantity': 1,
    'installmentValue': '10.00',
    'noInterestInstallmentQuantity': 2,
    'creditCardHolderName': 'Guilherme Matosinho Stiebler',
    'creditCardHolderCPF': '05533146709',
    'creditCardHolderBirthDate': '23/01/1981',
    'creditCardHolderAreaCode': '98',
    'creditCardHolderPhone': '983329436',
    'billingAddressStreet': 'Rua Voluntários da Pátria, 101',
    'billingAddressNumber': '604',
    'billingAddressComplement': 'apto',
    'billingAddressDistrict': 'Botafogo',
    'billingAddressPostalCode': '22270-000',
    'billingAddressCity': 'Rio de Janeiro',
    'billingAddressState': 'RJ',
    'billingAddressCountry': 'BRA',
  };
  let sessionId = '';
  let response;
  try {
    response = await axios({
      method:'post',
      withCredentials: true,
      crossdomain: true,
      headers: { 
        "Content-Type" :"application/x-www-form-urlencoded; charset=ISO-8859-1",
        "Cache-Control": "no-cache",
      },
      responseType:'document',
      url:'https://ws.pagseguro.uol.com.br/v2/transactions',
      data: param(reqData)
    });
  } catch (error) {
    console.log(error);
  }
  

  console.log(response);
  // if(response.status === 200)
  // {
  //   parseString(response.data, function (err, result) {
      
  //     sessionId = result.session.id[0];
  //   });
  // }
  
  return sessionId;
};
