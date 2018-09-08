
export function mapPagseguroBadRequest(response): any {

  let errors = {};

  for(let i = 0; i < response.length; i++){
    switch(response[i])
    {
      case "10000": 
        errors['cardNumber'] = 'Número de cartão de crédito inválido.';
        break;
      case "10003": 
        errors['cvv'] = 'Código de segurança inválido.';
        break;
      case "53087": 
        errors['general'] = 'Dados de cartão inválidos.';
        break;
      case "53091": 
        errors['general'] = 'Erro ao efetuar pagamento. Tente novamente.';
        break;
      case "53092": 
        errors['cardNumber'] = 'Bandeira de cartão não aceitável.';
        break;
      case "53141": 
        errors['senderName'] = 'Cliente bloqueado.';
        break;
      case "53142": 
        errors['general'] =  'Erro ao efetuar pagamento. Tente novamente.';
        break;
      case "53020": 
        errors['senderPhone'] =  'Campo telefone é obrigatório';
        break;
      case "53118": 
        errors['senderCpf'] =  'Campo CPF é obrigatório';
        break;
      case "53013": 
        errors['senderName'] =  'Campo Nome do Cliente é obrigatório';
        break;
      case "53010": 
        errors['senderEmail'] =  'Campo Email do Cliente é obrigatório';
        break;
      case "53042": 
        errors['creditCardHolderName'] =  'Campo Nome no Cartão é obrigatório';
        break;
      case "53045": 
        errors['creditCardHolderCPF'] =  'Campo CPF do dono do cartão é obrigatório';
        break;
      case "5003": 
        errors['general'] =  'Falha de comunicação com a instituição financeira';
        break;
      case "10001": 
        errors['cardNumber'] =  'Número do cartão com tamanho inválido';
        break;
      case "10002": 
        errors['expirationDate'] =  'Data no formato inválido';
        break;
      case "10004": 
        errors['cvv'] =  'Campo Código de Segurança é obrigatório';
        break;
      case "10006": 
        errors['cvv'] =  'Campo Código de Segurança com tamanho inválido';
        break;
      case "53011": 
        errors['senderEmail'] =  'Campo Email com tamanho inválido';
        break;
      case "53012": 
        errors['senderEmail'] =  'Email com formato inválido';
        break;
      case "53017": 
        errors['senderCpf'] =  'CPF inválido';
        break;
      case "53141": 
        errors['general'] =  'Usuário bloqueado pela instituição financeira';
        break;
      case "53015": 
        errors['senderName'] =  'Nome inválido';
        break;
      case "53044": 
        errors['creditCardHolderName'] =  'Nome inválido';
        break;
      
    }
  }
  console.log(errors);
  return errors;
}

export function mapPagseguroBadRequestForCardToken(response): string {
  const errors = mapPagseguroBadRequest(Object.keys(response));
  return JSON.stringify(errors);
}