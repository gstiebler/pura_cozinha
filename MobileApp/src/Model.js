import { AsyncStorage } from 'react-native';
import { getGeolocation} from './lib/geolocation';

function makeId(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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

async function fetchQuery(query) {
  const port = '3000';
  try {
    const res = await fetch('http://192.168.0.14:' + port + '/graphql', {
      method: 'POST',
      headers: { "Content-type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    return json.data;
  } catch(err) {
    console.error(err);
  }
}

class Model {

  constructor() {
    this.cartItems = new Map();
    this.address = '';
    this.initializeUserId();
  }

  async initializeUserId() {
    this.userId = await AsyncStorage.getItem(USER_ID_KEY);
    if(this.userId === null) {
      this.userId = makeId(8);
      await AsyncStorage.setItem(USER_ID_KEY, this.userId);
    }
  }

  async getFoodMenu() {
    try {
      const geo = await getGeolocation();
      const fields = '_id, title, price, description, imgURL';
      const query = `query { menuItems(lat: ${geo.latitude}, lng: ${geo.longitude}) { ${fields} } }`;
      const result = await fetchQuery(query);
      return result.menuItems;
    } catch(err) {
      console.error(err);
      return [];
    }
  }

  getFoodMenuItemById(menuItemId) {
    return menuItemFixture.find(item => item.id == menuItemId);
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

  pay(creditCardDetails) {
    console.log(creditCardDetails);
  }

}

const model = new Model();
export default model;