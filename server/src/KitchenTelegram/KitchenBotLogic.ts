import { Kitchen } from '../db/models/kitchen';

export class KitchenBotLogic {

  private state: string;
  private sendMessageFn: any;
  private kitchenId: any;

  constructor(sendMessageFn) {
    this.sendMessageFn = sendMessageFn;
    this.state = 'ROOT';
  }

  async initialize(username) {
    const kitchen: any = await Kitchen.findOne({ 'telegram_username': username });
    this.kitchenId = kitchen._id;
  }

  async receive(receivedMsg) {
    const kitchen: any = await Kitchen.findById(this.kitchenId);
    if (!kitchen) {
      throw new Error('Kitchen not found');
    }
    this.sendMenu(kitchen);
  }

  sendMenu(kitchen) {
    let msg = '';
    if (kitchen.active === 'YES') {
      msg = 'Cozinha está ativa';
    } else {
      msg = 'Cozinha está inativa';
    }

    const userOptions = [
      [{ text: 'primeiro' }],
      [{ text: 'segundo' }],
    ];

    const options = {
      reply_markup: JSON.stringify({
        keyboard: userOptions,
        one_time_keyboard: true
      })
    };

    this.sendMessageFn(msg, options);
  }

}