
export interface Kitchen {
  _id?: string;
  name: string;
  address: string;
}

export class Model {

  private network: any;

  constructor(network) {
    this.network = network;
  }

  async getFoodMenuItems() {
    try {
      const fields = '_id, title, price, description, imgURL';
      const query = `query { menuItems(lat: 0.0, lng: 0.0) { ${fields} } }`;
      const result = await this.network.fetchQuery(query);
      return result.menuItems;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getOrders() {
    const fields = 'id, kitchen { _id, name }, total, datetime, status';
    const query = `query { orders { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.orders;
  }

  async getKitchens(): Promise<Kitchen[]> {
    const fields = '_id, name, address';
    const query = `query { kitchens { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.kitchens;
  }

  async getKitchen(id: string): Promise<Kitchen> {
    const fields = 'name, address';
    const query = `query { kitchen(id: "${id}") { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.kitchen;
  }

  async saveKitchen(kitchen: Kitchen) {
    const kitchenFields = 'name, address';
    const kitchenValues = `{ name: "${kitchen.name}", address: "${kitchen.address}" }`;
    const mutSave = `mutation { saveKitchen(newKitchenData: ${kitchenValues}) { ${kitchenFields} } }`;
    const result = await this.network.fetchQuery(mutSave);
    return result.kitchens;
  }


}
