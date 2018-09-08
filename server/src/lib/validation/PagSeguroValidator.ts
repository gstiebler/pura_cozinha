import * as empty from './isEmpty';
import { IPaymentRequest } from '../../../../common/Interfaces';
const Validator = require('validator');


export function validatePaymentInput(request: IPaymentRequest, cardInfo)
{
    let errors = {};

    request.senderName = !empty.isEmpty(request.senderName) ? request.senderName : '';
    request.senderCPF = !empty.isEmpty(request.senderCPF) ? request.senderCPF : '';
    request.senderPhone = !empty.isEmpty(request.senderPhone) ? request.senderPhone : '';
    request.senderEmail = !empty.isEmpty(request.senderEmail) ? request.senderEmail : '';
    request.creditCardHolderName = !empty.isEmpty(request.creditCardHolderName) ? request.creditCardHolderName : '';
    request.creditCardHolderCPF = !empty.isEmpty(request.creditCardHolderCPF) ? request.creditCardHolderCPF : '';
    request.creditCardHolderBirthDate = !empty.isEmpty(request.creditCardHolderBirthDate) ? request.creditCardHolderBirthDate : '';
    request.creditCardHolderPhone = !empty.isEmpty(request.creditCardHolderPhone) ? request.creditCardHolderPhone : '';
    cardInfo.cardNumber = !empty.isEmpty(cardInfo.cardNumber) ? cardInfo.cardNumber : '';
    cardInfo.cvv = !empty.isEmpty(cardInfo.cvv) ? cardInfo.cvv : '';
    cardInfo.expirationDate = !empty.isEmpty(cardInfo.expirationDate) ? cardInfo.expirationDate : '';

    if(!Validator.isEmail(request.senderEmail))
    {
        errors['senderEmail'] = 'Email inválido';
    }

    if(!Validator.isCreditCard(cardInfo.cardNumber))
    {
        errors['cardNumber'] = 'Número de cartão inválido';
    }

    if(!Validator.isLength(request.creditCardHolderBirthDate, {min: 10, max: 10}))
    {
        errors['creditCardHolderBirthDate'] = 'Data de Aniversário inválida';
        errors['senderBirthday'] = 'Data de Aniversário inválida';
    }

    cardInfo.cvv = cardInfo.cvv.replace("_", "");
    if(!Validator.isLength(cardInfo.cvv, {min: 3, max: 3}))
    {
        errors['cvv'] = 'CVV deve conter 3 dígitos';
    }

    cardInfo.expirationDate = cardInfo.expirationDate.replace("_", "");
    if(!Validator.isLength(cardInfo.expirationDate, {min: 7, max: 7}))
    {
        errors['expirationDate'] = 'Data de expiração inválida';
    }

    request.senderCPF = request.senderCPF.replace("_", "");
    if(!Validator.isLength(request.senderCPF, {min: 11, max: 11}))
    {
        errors['senderCpf'] = 'O campo CPF deve conter 11 dígitos';
    }

    request.creditCardHolderCPF = request.creditCardHolderCPF.replace("_", "");
    if(!Validator.isLength(request.creditCardHolderCPF, {min: 11, max: 11}))
    {
        errors['creditCardHolderCPF'] = 'O campo CPF deve conter 11 dígitos';
    }

    request.senderPhone = request.senderPhone.replace("_", "");
    if(!Validator.isLength(request.senderPhone, {min: 9, max: 9}))
    {
        errors['senderPhone'] = 'Telefone inválido';
    }

    request.creditCardHolderPhone = request.creditCardHolderPhone.replace("_", "");
    if(!Validator.isLength(request.creditCardHolderPhone, {min: 9, max: 9}))
    {
        errors['creditCardHolderPhone'] = 'Telefone inválido';
    }

    //required validations
    if(Validator.isEmpty(request.senderName))
    {
        errors['senderName'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(request.senderCPF))
    {
        errors['senderCpf'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(request.senderPhone))
    {
        errors['senderPhone'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(request.senderEmail))
    {
        errors['senderEmail'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(request.creditCardHolderName))
    {
        errors['creditCardHolderName'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(request.creditCardHolderCPF))
    {
        errors['creditCardHolderCPF'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(request.creditCardHolderBirthDate))
    {
        errors['creditCardHolderBirthDate'] = 'Campo obrigatório';
        errors['senderBirthday'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(request.creditCardHolderPhone))
    {
        errors['creditCardHolderPhone'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(cardInfo.cardNumber))
    {
        errors['cardNumber'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(cardInfo.cvv))
    {
        errors['cvv'] = 'Campo obrigatório';
    }
    if(Validator.isEmpty(cardInfo.expirationDate))
    {
        errors['expirationDate'] = 'Campo obrigatório';
    }

    return errors;
}