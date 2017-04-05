
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
};

export interface ICreditCard {
  type: string;
  number: string;
  expire_month: string;
  expire_year: string;
  cvv2: string;
  first_name: string;
  last_name: string;
}

export interface IOrder {
  user_id: string;
  items: {
    food_menu_item_id: string;
    quantity: number;
  }[];
  credit_card_info: ICreditCard;
  selected_kitchen_id: string;
}

export class Model {

  network;
  AsyncStorage;
  getGeolocation;
  foodMenuItems: FoodMenuItem[];
  cartItemsQtd: Map<string, number>;
  address: string;
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

  async order(creditCardDetails: ICreditCard) {
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
      credit_card_info: creditCardDetails,
      selected_kitchen_id: this.selectedKitchenId
    };

    const orderStr = objToGrahqlStr(order);
    const mutSave = `mutation { saveOrder(newOrderData: ${orderStr}) }`;
    await this.network.fetchQuery(mutSave);
  }

}

export function convertCCFormat(interfaceCCInfo): ICreditCard {
  const expiryParts = interfaceCCInfo.expiry.split('/');
  const expire_month = expiryParts[0];
  const expire_year = '20' + expiryParts[1];
  const ccRawValues = interfaceCCInfo;
  const ccInfo: ICreditCard = {
    type: ccRawValues.type,
    number: interfaceCCInfo.number.replace(/ /g, ''),
    expire_month,
    expire_year,
    cvv2: interfaceCCInfo.cvc,
    first_name: 'PrimeiroNome',
    last_name: 'ÚltimoNome'
  };
  return ccInfo;
}