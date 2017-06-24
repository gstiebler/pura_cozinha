import PayPal from 'react-native-paypal-wrapper';
import * as ENV from '../app.env';

const ppEnv = new Map();
ppEnv.set('NO_NETWORK', PayPal.NO_NETWORK);
ppEnv.set('SANDBOX', PayPal.SANDBOX);
ppEnv.set('PRODUCTION', PayPal.PRODUCTION);

PayPal.initialize(ppEnv.get(ENV.VARS.PAY_PAL_MODE), ENV.VARS.PAY_PAL_CLIENT_ID);

export async function execute(price: number, description: string) {
  const options = {
    price: price.toString(),
    currency: 'BRL',
    description: description,
  };
  return PayPal.pay(options);
}
