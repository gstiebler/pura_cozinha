
import { CreditCardInfo, cardToken } from './core/MercadoPago';

function makeId(length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function objToGrahqlStr(obj) {
  const str = JSON.stringify(obj);
  return str.replace(/\"([^(\")"]+)\":/g, "$1:");
}

const USER_ID_KEY = 'general:user_id';

interface GeoCoordinates {
  lat: number;
  lng: number;
}

interface Kitchen {
  _id?: string;
  name: string;
  address: string;
  coordinates: GeoCoordinates;
}

export interface KitchenWithDist extends Kitchen {
  distMeters: number;
}

export interface FoodMenuItem {
  _id?: string;
  title: string;
  description: string;
  price: number;
}

interface ICartItem extends FoodMenuItem {
  qty: number;
}

export interface IOrder {
  user_id: string;
  items: {
    food_menu_item_id: string;
    quantity: number;
  }[];
  cc_token: string;
  selected_kitchen_id: string;
  name: string;
  address: string;
}

export class Model {

  network;
  AsyncStorage;
  getGeolocation;
  foodMenuItems: FoodMenuItem[];
  cartItemsQtd: Map<string, number>;
  address: string;
  public name: string;
  userId: string;
  private selectedKitchenId: string;

  constructor(network, AsyncStorage, getGeolocation) {
    this.network = network;
    this.AsyncStorage = AsyncStorage;
    this.getGeolocation = getGeolocation;

    this.foodMenuItems = [];
    this.cartItemsQtd = new Map();
    this.address = '';
    this.initializeUserId();
    this.fetchFoodMenu();
  }

  async initializeUserId() {
    this.userId = await this.AsyncStorage.getItem(USER_ID_KEY);
    if (this.userId === null) {
      this.userId = makeId(20);
      await this.AsyncStorage.setItem(USER_ID_KEY, this.userId);
    }
  }

  setSelectedKitchenId(selectedKitchenId) {
    this.selectedKitchenId = selectedKitchenId;
  }

  async fetchFoodMenu() {
    try {
      const fields = '_id, title, price, description, imgURL';
      const query = `query { menuItems(lat: ${0.0}, lng: ${0.0}) { ${fields} } }`;
      const result = await this.network.fetchQuery(query);
      this.foodMenuItems = result.menuItems;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  getFoodMenu() {
    return this.foodMenuItems;
  }

  getFoodMenuItemById(menuItemId) {
    return this.foodMenuItems.find(item => item._id === menuItemId);
  }

  async menuItemsByKitchen() {
    const fields = '_id, title, price, description, imgURL';
    const query = `query { menuItemsByKitchen(kitchen_id: "${this.selectedKitchenId}") { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.menuItemsByKitchen;
  }

  getCartQty(menuItemId): number {
    if (!this.cartItemsQtd.has(menuItemId)) {
      return 0;
    } else {
      return this.cartItemsQtd.get(menuItemId);
    }
  }

  setCartQty(menuItemId: string, qty: number) {
    if (qty === 0) {
      this.cartItemsQtd.delete(menuItemId);
    } else {
      this.cartItemsQtd.set(menuItemId, qty);
    }
  }

  getCartItems(): ICartItem[] {
    const cartItems: ICartItem[] = [];
    const entries = this.cartItemsQtd.entries();
    for (let key of entries) {
      let id = key[0];
      let qty = key[1];
      let menuItem = this.getFoodMenuItemById(id);
      let item: any = { qty };
      Object.assign(item, menuItem);
      cartItems.push(item);
    }
    return cartItems;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(newAddress: string) {
    this.address = newAddress;
  }

  getTotalCartValue(): number {
    const selectedItems = this.getCartItems();
    let total = 0.0;
    for (let item of selectedItems) {
      total += item.price * item.qty;
    }
    return total;
  }

  async getKitchensByDistance(coordinates: GeoCoordinates): Promise<KitchenWithDist[]> {
    const fields = '_id, name, address, distMeters, coordinates { lat, lng }';
    const query = `query { kitchensByDistance(lat: ${coordinates.lat}, lng: ${coordinates.lng}) { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.kitchensByDistance;
  }

  async order(creditCardDetails: CreditCardInfo) {
    const token = await cardToken(creditCardDetails);

    const cartItems = this.getCartItems();

    const items = cartItems.map((item) => {
      return {
        food_menu_item_id: item._id,
        quantity: item.qty
      };
    });

    const order: IOrder = {
      user_id: this.userId,
      items: items,
      cc_token: token,
      selected_kitchen_id: this.selectedKitchenId,
      address: this.address,
      name: this.name
    };

    const orderStr = objToGrahqlStr(order);
    const mutSave = `mutation { saveOrder(newOrderData: ${orderStr}) }`;
    await this.network.fetchQuery(mutSave);
  }

}

/**
 * Interface to the values returned from the Credit Card library
 */
interface CreditCardComponentInfo {
  expiry: string;
  type: string;
  cvc: string;
  number: string;
}

export function convertCCFormat(interfaceCCInfo: CreditCardComponentInfo): CreditCardInfo {
  const expiryParts = interfaceCCInfo.expiry.split('/');
  const expirationMonth = parseInt(expiryParts[0]);
  const expirationYear = parseInt('20' + expiryParts[1]);
  const ccRawValues = interfaceCCInfo;
  const ccInfo: CreditCardInfo = {
    // type: ccRawValues.type,
    cardNumber: interfaceCCInfo.number.replace(/ /g, ''),
    expirationMonth,
    expirationYear,
    securityCode: interfaceCCInfo.cvc,
    cardHolderName: null
  };
  return ccInfo;
}