import { expect } from 'chai';
import * as logger from 'winston';
import * as OrderProcess from '../core/OrderProcess';
import { IOrder } from '../db/models/Order';

describe('order', () => {

  it('format order as string', () => {
    const order: IOrder = {
      userId: '',
      local: '',
      localComplement: '',
      status: 'PENDING',
      paymentOption: 'Dinheiro',
      telephoneNumber: '',
      totalAmount: 23,
      items: [
        {
          qty: 2,
          itemTotalPrice: 20,
          foodMenuItem: {
            id: '',
            title: 'Primeiro item',
            description: 'descrição',
            price: 10,
          }
        },
        {
          qty: 1,
          itemTotalPrice: 3,
          foodMenuItem: {
            id: '',
            title: 'Segundo item',
            description: 'descrição 2',
            price: 3,
          }
        }
      ],
      statusHistory: [],
    };
    const formattedOrder = OrderProcess.formatOrder(order);
    expect(formattedOrder).to.equal('Primeiro item: 2\nSegundo item: 1');
  })

});
