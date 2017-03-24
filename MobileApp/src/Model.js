
function makeId(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function objToGrahqlStr(obj) {
  const str = JSON.stringify(obj);
  return str.replace(/\"([^(\")"]+)\":/g,"$1:");
}

const menuItemFixture = [
  {
    id: 34,
    title: 'Sanduiche de frango',
    description: 'Muito gostoso, feito com frango desfiado',
    price: 12.39
  },
  {
    id: 97,
    title: 'Sanduiche de mignon',
    description: 'Feito com o melhor file mignon da cidade, bem passado. Os bois ' +
        'foram muito bem tratados.',
    price: 15.99
  },
  {
    id: 609,
    title: 'Açai',
    description: 'Açai batido com banana e morango, vem cheião.',
    price: 14.00
  },
];

const USER_ID_KEY = 'general:user_id';

export class Model {

  constructor(network, AsyncStorage, getGeolocation) {
    this.network = network;
    this.AsyncStorage = AsyncStorage;
    this.getGeolocation = getGeolocation;
    this.cartItems = new Map();
    this.address = '';
    this.initializeUserId();
    this.fetchFoodMenu();
  }

  async initializeUserId() {
    this.userId = await this.AsyncStorage.getItem(USER_ID_KEY);
    if(this.userId === null) {
      this.userId = makeId(8);
      await this.AsyncStorage.setItem(USER_ID_KEY, this.userId);
    }
  }

  async fetchFoodMenu() {
    try {
      const geo = await this.getGeolocation();
      const fields = '_id, title, price, description, imgURL';
      const query = `query { menuItems(lat: ${geo.latitude}, lng: ${geo.longitude}) { ${fields} } }`;
      const result = await this.network.fetchQuery(query);
      this.foodMenuItems = result.menuItems;
    } catch(err) {
      console.error(err);
      return [];
    }
  }

  getFoodMenu() {
    return this.foodMenuItems
  }

  getFoodMenuItemById(menuItemId) {
    return this.foodMenuItems.find(item => item._id == menuItemId);
  }

  getCartQty(menuItemId) {
    if(!this.cartItems.has(menuItemId)) {
      return 0;
    } else {
      return this.cartItems.get(menuItemId);
    }
  }

  setCartQty(menuItemId, qty) {
    if(qty === 0) {
      this.cartItems.delete(menuItemId);
    } else {
      this.cartItems.set(menuItemId, qty);
    }
  }

  getCartItems() {
    const cartItems = [];
    const entries = this.cartItems.entries();
    for(let key of entries) {
      let id = key[0];
      let qty = key[1];
      let menuItem = this.getFoodMenuItemById(id);
      let item = { qty };
      Object.assign(item, menuItem);
      cartItems.push(item);
    }
    return cartItems;
  }

  getAddress() {
    return this.address;
  }

  setAddress(newAddress) {
    this.address = newAddress;
  }

  getTotalCartValue() {
    const selectedItems = this.getCartItems();
    let total = 0.0;
    for(item of selectedItems) {
      total += item.price * item.qty;
    }
    return total;
  }

  async pay(creditCardDetails) {
    const cartItems = this.getCartItems();

    const items = cartItems.map((item) => {
      return {
        food_menu_item_id: item._id,
        quantity: item.qty
      }
    });
    const itemsStr = objToGrahqlStr(items);

    const orderValues = `{ user_id: "${this.userId}", items: ${itemsStr} }`;
    const orderFields = 'user_id, items { food_menu_item_id, quantity }';
    const mutSave = `mutation { saveOrder(newOrderData: ${orderValues}) { ${orderFields} } }`;

    await this.network.fetchQuery(mutSave);
  }

}