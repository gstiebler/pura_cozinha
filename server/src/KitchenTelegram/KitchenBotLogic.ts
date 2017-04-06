import { Kitchen } from '../db/models/kitchen';
import { MenuItem } from '../db/models/menuItem';

const kitchens = new Map<string, KitchenBotLogic>();

export async function getKitchenLogic(username: string, bot, chatId, sendMessage) {
  let logic: KitchenBotLogic;
  if (kitchens.has(username)) {
    logic = kitchens.get(username);
  } else {
    logic = new KitchenBotLogic(sendMessage);
    await logic.initialize(username);
    kitchens.set(username, logic);
  }
  return logic;
}

export class KitchenBotLogic {

  private state: string;
  private sendMessageFn: any;
  private kitchenId: any;
  private selectedFoodItemToUpdate: string;


  constructor(sendMessageFn) {
    this.sendMessageFn = sendMessageFn;
    this.state = 'ROOT';
  }

  async initialize(username) {
    const kitchen: any = await Kitchen.findOne({ 'telegram_username': username });
    if (!kitchen) {
      throw new Error('Cozinha não encontrada para o usuário ' + username);
    }
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
    } else if (this.state === 'STOCK_QUANTITY_INPUT') {
      const kitchen: any = await Kitchen.findById(this.kitchenId);
      const stock: any[] = kitchen.stock;
      for (let i = 0; i < stock.length; i++) {
        if (stock[i].menu_item.toString() === this.selectedFoodItemToUpdate) {
          stock[i].quantity = parseInt(receivedMsg.text);
          await Kitchen.update({ _id: this.kitchenId }, { $set: { stock } });
          const menuItem: any = await MenuItem.findById(this.selectedFoodItemToUpdate);
          this.sendMessageFn(`Quantidade de ${menuItem.title} atualizada para ${stock[i].quantity}`);
          break;
        }
      }
      this.sendMainMenu();
    } else {
      this.sendMainMenu();
    }
  }

  async callbackQuery(receivedMsg) {
    const foodMenuItemId = receivedMsg.data;
    this.selectedFoodItemToUpdate = foodMenuItemId;
    const menuItem: any = await MenuItem.findById(foodMenuItemId);
    this.sendMessageFn(`Digite a quantidade de ${menuItem.title}:`);
    this.state = 'STOCK_QUANTITY_INPUT';
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

  async sendStockMenu() {
    const kitchen: any = await Kitchen.findById(this.kitchenId);
    const stock: any[] = kitchen.stock;
    let msg = 'Estoque:\n';
    const stockItemsButtons = [];
    for (let stockItem of stock) {
      const menuItem: any = await MenuItem.findById(stockItem.menu_item);
      msg += `${menuItem.title}: ${stockItem.quantity}\n`;
      stockItemsButtons.push([{ text: menuItem.title, callback_data: stockItem.menu_item }]);
    }

    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: stockItemsButtons
      })
    };

    this.sendMessageFn(msg, options);
    this.state = 'STOCK_LIST';
  }

}