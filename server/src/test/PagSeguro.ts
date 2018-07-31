// var PagSeguro = require('node-pagseguro');

const PagSeguro = require('pagseguro-nodejs');


testPagseguro();

function testPagseguro(){
  console.log("start test");

  var pagseguro = new PagSeguro({
    email: 'guilherme.mst@gmail.com',
    token: '6D17B04C51F749EEA3F3ECE500FE01C1',
    mode: PagSeguro.MODE_SANDBOX,
    debug: true
  });

  pagseguro.currency('BRL');
  pagseguro.reference('12345');

  /* Produtos */
  pagseguro.addItem({
    id: '1',
    description: 'Descrição do primeiro produto',
    amount: '40.00',
    quantity: '1'
  });

  pagseguro.addItem({
    id: '2',
    description: 'Descrição do segundo produto',
    amount: '40.00',
    quantity: '9'
  });


  pagseguro.sender({
    name: 'Edvaldo Szymonek',
    email: 'nigelnaiguel.comp@gmail.com',
    phone: {
      areaCode: '51',
      number: '12345678'
    }
  });

  pagseguro.shipping({
    type: 1,
    name: 'Edvaldo Szymonek',
    email: 'nigelnaiguel.comp@gmail.com',
    address: {
      street: 'Endereço',
      number: '10',
      city: 'Nome da cidade',
      state: 'PR',
      country: 'BRA'
    }
  });

  pagseguro.checkout(function(success, response) {
    if (success) {
      console.log('Success');
      console.log(response);
    } else {
      console.log('Error');
      console.error(response);
    }
  });


//   let payment = new PagSeguro({
//     email: 'guilherme.mst@gmail.com',
//     token: '6D17B04C51F749EEA3F3ECE500FE01C1',
//     sandbox: true,
//     sandbox_email: 'v26476421954760399948@sandbox.pagseguro.com.br'
//  });

//  console.log("payment " + payment);

//   payment.setSender({
//     name: 'Nigel da Silva Lima',
//     email: 'comprador@sandbox.pagseguro.com.br',
//     cpf_cnpj: "05575340384",
//     area_code: '11',
//     phone: '983329436',
//     birth_date: '18/03/1994' //formato dd/mm/yyyy
//   });

//   payment.setShipping({
//     street: 'Av Perimetral Sul',
//     number: '501',
//     district: 'District',
//     city: 'Sao Luis',
//     state: 'MA',
//     postal_code: '65000000',
//     same_for_billing: true //opcional, informar se o endereço de entrega for o mesmo do endereço de cobrança
//   });

//   payment.addItem({
//     qtde: 1,
//     value: 35,
//     description: 'Item 1'
//   });

//   payment.sessionId(function(err, session_id) { });
//   payment.sendTransaction({
//       method: 'boleto', //'boleto' ou 'creditCard'
//       value: 35,
//       installments: 1, //opcional, padrão 1
//       hash: 'rye2B5mp9T9yk12b' //senderHash gerado pela biblioteca do PagSeguro
//     }, function(err, data) {
//       console.log(data);
//       console.log(err);
//   });
  
};
