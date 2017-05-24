import { Kitchen } from '../db/models/kitchen';
import { MenuItem } from '../db/models/menuItem';
import { Order, PaymentStatus } from '../db/models/Order';

const kitchens = new Map<string, KitchenBotLogic>();

export async function kitchenLogicSingleton(username: string, sendMessage) {
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

  private handler: (receivedMsg: string) => void;
  private sendMessageFn: (msg: string, options?: any) => void;
  private kitchenId: any;
  private selectedFoodItemToUpdate: string;

  constructor(sendMessageFn) {
    this.sendMessageFn = sendMessageFn;
    this.handler = this.defaultHandler.bind(this);
  }

  async initialize(username) {
    const kitchen: any = await Kitchen.findOne({ 'telegram_username': username });
    if (!kitchen) {
      throw new Error('Cozinha não encontrada para o usuário ' + username);
    }
    this.kitchenId = kitchen._id;
  }

  async receive(receivedMsg) {
    try {
      await this.handler(receivedMsg);
    } catch (err) {
      console.error(err);
      this.sendMainMenu();
    }
  }

  async mainMenuHandler(receivedMsg) {
    if (receivedMsg.text === 'Definir cozinha como ativa') {
      await Kitchen.update({ _id: this.kitchenId }, { $set: { active: 'YES' } });
      await this.sendMainMenu();
    } else if (receivedMsg.text === 'Definir cozinha como inativa') {
      await Kitchen.update({ _id: this.kitchenId }, { $set: { active: 'NO' } });
      await this.sendMainMenu();
    } else if (receivedMsg.text === 'Modificar estoque') {
      await this.sendStockMenu();
    } else if (receivedMsg.text === 'Definir pedido como pronto') {
      await this.sendSetOrderAsReadyMenu();
    } else if (receivedMsg.text === 'Definir pedido como entregue') {
      // await this.sendSetOrderAsDeliveredMenu();
    } else {
      await this.sendMainMenu();
    }
  }

  async defaultHandler(receivedMsg) {
      await this.sendMainMenu();
  }

  async stockQuantityInputHandler(receivedMsg) {
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
    await this.sendMainMenu();
  }

  async orderAsReadyHandler(paidOrders: any[], receivedMsg) {
    const paidOrderIndex = parseInt(receivedMsg.data);
    if (paidOrderIndex < 0 || paidOrderIndex >= paidOrders.length ||
        isNaN(paidOrderIndex)) {
      throw new Error('Invalid paid item index');
    }
    const paidOrder = paidOrders[paidOrderIndex];
    await Order.update({ _id: paidOrder._id }, { $set: { status: PaymentStatus.READY } });
    // TODO: send notification to the user
    this.sendMessageFn('Pedido marcado como pronto');
    await this.sendMainMenu();
  }

  async callbackQuery(receivedMsg) {
    try {
      await this.handler(receivedMsg);
    } catch (err) {
      console.error(err);
      this.sendMainMenu();
    }
  }

  async askStockQuantityHandler(receivedMsg) {
    const foodMenuItemId = receivedMsg.data;
    this.selectedFoodItemToUpdate = foodMenuItemId;
    const menuItem: any = await MenuItem.findById(foodMenuItemId);
    this.sendMessageFn(`Digite a quantidade de ${menuItem.title}:`);
    this.handler = this.stockQuantityInputHandler.bind(this);
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

    const paidOrders = await Order.find({ status: PaymentStatus.PAYMENT_OK, kitchen: this.kitchenId });
    const readyOrders = await Order.find({ status: PaymentStatus.READY, kitchen: this.kitchenId });

    const userOptions = [
      [{ text: 'Definir cozinha como ' + changeText }],
      [{ text: 'Modificar estoque' }],
    ];

    if (paidOrders.length > 0) {
      userOptions.push([{ text: 'Definir pedido como pronto' }]);
    }
    if (readyOrders.length > 0) {
      userOptions.push([{ text: 'Definir pedido como entregue' }]);
    }

    const options = {
      reply_markup: JSON.stringify({
        keyboard: userOptions,
        one_time_keyboard: true
      })
    };

    this.sendMessageFn(msg, options);
    this.handler = this.mainMenuHandler.bind(this);
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
    this.handler = this.askStockQuantityHandler.bind(this);
  }

  async sendSetOrderAsReadyMenu() {
    const kitchen: any = await Kitchen.findById(this.kitchenId);

    const paidOrders: any[] = await Order.find({ status: PaymentStatus.PAYMENT_OK, kitchen: this.kitchenId });
    let msg = 'Pedido a ser marcado como pronto:\n';
    const paidItemsButtons = [];
    for (let i = 0; i < paidOrders.length; i++) {
      const paidOrder = paidOrders[i];
      const orderItems = paidOrder.items.map(orderItem => `${orderItem.title}: ${orderItem.quantity}`);
      const itemsStr = orderItems.join(', ');
      msg += `${i + 1}) ${itemsStr}\n`;
      paidItemsButtons.push([{ text: `${i + 1}`, callback_data: i.toString() }]);
    }

    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: paidItemsButtons
      })
    };

    this.sendMessageFn(msg, options);
    this.handler = this.orderAsReadyHandler.bind(this, paidOrders);
  }

  sendOrder(items: any[], address: string, name: string) {
    let msg = 'Novo pedido!\n';
    for (let item of items) {
      msg += `${item.title}: ${item.quantity}\n`;
    }
    msg += name + '\n';
    msg += address + '\n';
    this.sendMessageFn(msg);
  }

}

export function getKitchenLogic(username: string) {
  const kitchenLogic = kitchens.get(username);
  if (!kitchenLogic) {
    throw new Error('Kitchen not connected');
  }
  return kitchenLogic;
}