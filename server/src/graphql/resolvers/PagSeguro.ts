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
    'token': '6D17B04C51F749EEA3F3ECE500FE01C1',
    'paymentMode': 'default',
    'paymentMethod': 'creditCard',
    'receiverEmail': 'guilherme.mst@gmail.com',
    'currency': 'BRL',
    'extraAmount': '0.00',
    'itemId1': '0001',
    'itemDescription1': 'Notebook Prata',
    'itemAmount1': '24300.00',
    'itemQuantity1': 1,
    'notificationURL': 'https://sualoja.com.br/notifica.html',
    'reference': 'REF1234',
    'senderName': 'Jose Comprador',
    'senderCPF': '22111944785',
    'senderAreaCode': '11',
    'senderPhone': '56273440',
    'senderEmail': 'c81447846550186559447@sandbox.pagseguro.com.br',
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
    'installmentValue': '24300.00',
    'noInterestInstallmentQuantity': 2,
    'creditCardHolderName': 'Jose Comprador',
    'creditCardHolderCPF': '22111944785',
    'creditCardHolderBirthDate': '27/10/1987',
    'creditCardHolderAreaCode': '11',
    'creditCardHolderPhone': '56273440',
    'billingAddressStreet': 'Av. Brig. Faria Lima',
    'billingAddressNumber': '1384',
    'billingAddressComplement': '5o andar',
    'billingAddressDistrict': 'Jardim Paulistano',
    'billingAddressPostalCode': '01452002',
    'billingAddressCity': 'Sao Paulo',
    'billingAddressState': 'SP',
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
      url:'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions',
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
