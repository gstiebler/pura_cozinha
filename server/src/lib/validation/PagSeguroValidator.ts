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
    request.shippingAddressStreet = !empty.isEmpty(request.shippingAddressStreet) ? request.shippingAddressStreet : '';
    request.shippingAddressComplement = !empty.isEmpty(request.shippingAddressComplement) ? request.shippingAddressComplement : '';
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
        console.log('validation error email');
    }

    return errors;
}