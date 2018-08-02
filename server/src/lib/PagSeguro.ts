const axios = require('axios');
var parseString = require('xml2js').parseString;

function param( params ) {
  const p = new URLSearchParams;
  for( const [ key, value ] of Object.entries( params ) ) {
      p.set( key, String( value ) );
  }
  return p.toString();
}


export function getPaymentSessionId(){
  const reqData = {
    'email': 'guilherme.mst@gmail.com',
    'token': '6D17B04C51F749EEA3F3ECE500FE01C1'
  };

  axios({
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
  })
  .then(function(response) {
    parseString(response.data, function (err, result) {
      console.dir(result.session.id[0]);
    });
  })
  .catch(function (error) {
    console.log(error.response.status)
  });
};
