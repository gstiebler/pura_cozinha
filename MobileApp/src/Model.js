
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

class Model {

  constructor() {
    this.cartItems = new Map();
    this.address = '';
  }

  getFoodMenu() {
    return menuItemFixture;
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

}

const model = new Model();
export default model;