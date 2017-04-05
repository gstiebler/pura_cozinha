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
    if (this.state === 'MAIN_MENU') {
      if (receivedMsg.text === 'Definir cozinha como ativa') {
        await Kitchen.update({ _id: this.kitchenId }, { $set: { active: 'YES' } });
        this.sendMainMenu();
      } else if (receivedMsg.text === 'Definir cozinha como inativa') {
        await Kitchen.update({ _id: this.kitchenId }, { $set: { active: 'NO' } });
        this.sendMainMenu();
      } else if (receivedMsg.text === 'Modificar estoque') {
        this.sendStockMenu();
      } else {
        this.sendMainMenu();
      }
    } else {
      this.sendMainMenu();
    }
  }

  async sendMainMenu() {
    const kitchen: any = await Kitchen.findById(this.kitchenId);
    if (!kitchen) {
      throw new Error('Kitchen not found');
    }
    let msg = '';
    let changeText = '';
    if (kitchen.active === 'YES') {
      msg = 'Cozinha está ativa';
      changeText = 'inativa';
    } else {
      msg = 'Cozinha está inativa';
      changeText = 'ativa';
    }

    const userOptions = [
      [{ text: 'Definir cozinha como ' + changeText }],
      [{ text: 'Modificar estoque' }],
    ];

    const options = {
      reply_markup: JSON.stringify({
        keyboard: userOptions,
        one_time_keyboard: true
      })
    };

    this.sendMessageFn(msg, options);
    this.state = 'MAIN_MENU';
  }

  sendStockMenu() {

  }

}