import * as  paypal from 'paypal-rest-sdk';

paypal.configure({
  'mode': process.env.PAYPAL_MODE,
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_SECRET
});

function paymentDetailsSync(paymentId): Promise<any> {
  return new Promise((resolve, reject) => {
    paypal.payment.get(paymentId, function (error, res) {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
}

export async function confirmPayment(paymentId: string, expectedAmount: number) {
  const paymentDetails = await paymentDetailsSync(paymentId);
  const transactionAmountStr: string = paymentDetails.transactions[0].amount.total;
  const transactionAmount = parseFloat(transactionAmountStr);
  if (paymentDetails.state === 'approved' && expectedAmount === transactionAmount) {
    return true;
  } else {
    throw new Error('Payment information is diverging');
  }
}