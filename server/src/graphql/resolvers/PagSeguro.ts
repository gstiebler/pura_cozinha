const axios = require('axios');
const URLSearchParams = require('url-search-params');
var parseString = require('xml2js').parseString;
import { IPaymentRequest } from '../../../../common/Interfaces';
import * as pagSeguroErrors from '../../lib/PagSeguroErrors';


// @desc   Combine parameters into a parameter search string in the format 'param1&param2'
// @param  params: object
function param( params ) {
  
  const p = new URLSearchParams;
  for( const [ key, value ] of Object.entries( params ) ) {
      p.set( key, String( value ) );
  }
  return p.toString();
}


// @desc   Get payment session from PagSeguro service via post request
// @param  void
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



// @desc   Checkout payment (transparent method) to PagSeguro services
// @param  request: IPaymentRequest
export async function checkoutPayment(request: IPaymentRequest): Promise<any>{
  //12/2030
  
  const reqData = {
    'email': 'guilherme.mst@gmail.com',
    'token': '6D17B04C51F749EEA3F3ECE500FE01C1',
    'paymentMode': 'default',
    'paymentMethod': 'creditCard',
    'receiverEmail': 'guilherme.mst@gmail.com',
    'currency': 'BRL',
    'extraAmount': '0.00',
    'notificationURL': 'https://sualoja.com.br/notifica.html',
    'reference': 'REF1234',
    'senderName': request.senderName,
    'senderCPF': request.senderCPF,
    'senderAreaCode': request.senderAreaCode,
    'senderPhone': request.senderPhone,
    'senderEmail': request.senderEmail,
    'senderHash': request.senderHash,
    'shippingAddressStreet': request.shippingAddressStreet,
    'shippingAddressNumber': request.shippingAddressNumber,
    'shippingAddressComplement': request.shippingAddressComplement,
    'shippingAddressDistrict': request.shippingAddressDistrict,
    'shippingAddressPostalCode': request.shippingAddressPostalCode,
    'shippingAddressCity': request.shippingAddressCity,
    'shippingAddressState': request.shippingAddressState,
    'shippingAddressCountry': 'BRA',
    'shippingType': 1,
    'shippingCost': '0.00',
    'creditCardToken': request.creditCardToken,
    'installmentQuantity': 1,
    'installmentValue': request.installmentValue,
    'noInterestInstallmentQuantity': 2,
    'creditCardHolderName': request.creditCardHolderName,
    'creditCardHolderCPF': request.creditCardHolderCPF,
    'creditCardHolderBirthDate': request.creditCardHolderBirthDate,
    'creditCardHolderAreaCode': request.creditCardHolderAreaCode,
    'creditCardHolderPhone': request.creditCardHolderPhone,
    'billingAddressStreet': 'Av. Brig. Faria Lima',
    'billingAddressNumber': '1384',
    'billingAddressComplement': '5o andar',
    'billingAddressDistrict': 'Jardim Paulistano',
    'billingAddressPostalCode': '01452002',
    'billingAddressCity': 'Sao Paulo',
    'billingAddressState': 'SP',
    'billingAddressCountry': 'BRA',
  };

  //Items need to have number identification in the search url (item1, item2, item3, etc)
  for(var i=0; i< request.items.length; i++){
    reqData['itemId'+(i+1)] = request.items[i].itemId;
    reqData['itemDescription'+(i+1)] = request.items[i].itemDescription;
    reqData['itemAmount'+(i+1)] = request.items[i].itemAmount;
    reqData['itemQuantity'+(i+1)] = request.items[i].itemQuantity;
  }

  let finalErrors: Object;
  const errors = await transactionPostRequest(reqData);
  let errorsArray = [];
  if(errors != undefined){
    for(let i=0; i < errors.length; i++)
    errorsArray.push(errors[i].code[0]);
    finalErrors = pagSeguroErrors.mapPagseguroBadRequest(errorsArray);
  }
  
  if(finalErrors != undefined)
    return finalErrors;
  return {msg: 'success'};
};


// @desc   POST method to PagSeguro services for checkout payment
// @param  reqData: any
export async function transactionPostRequest(reqData: any): Promise<any>{
  let finalErrors: Object;
  const response = await axios({
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
  })
  .catch(error => {
    if(error.response.status === 400)
    {
      parseString(error.response.data, function (err, result) {
        const errors = result.errors.error;
        finalErrors = errors;
      });
    }
  });
  return finalErrors;
}


// @desc   Gets a toke for credit card info from PagSeguro services
// @param  paramsObj (card number, expiration date and cvv)
export const createCardToken = (paramsObj) => {
  return new Promise((resolve, reject) => {
    paramsObj.success = response => {
      resolve(response);
    };
    paramsObj.error = response => {
      reject(response);
    };
    window.PagSeguroDirectPayment.createCardToken(paramsObj);
  });
}


// @desc   Set the global session id retrived from PagSeguro
// @param  sessionId: string
export const setSessionId = (sessionId: string) => {
  window.PagSeguroDirectPayment.setSessionId(sessionId);
}


// @desc   Gets a hash value for current sender from PagSeguro services
// @param  void
export const getSenderHash = () => {
  return window.PagSeguroDirectPayment.getSenderHash();
}