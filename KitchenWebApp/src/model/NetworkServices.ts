import * as network from '../../../common/network';
import { IOrderSummary } from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';

export async function getOrders(): Promise<IOrderSummary[]> {
  return null;
  /*const fields = '_id, title, price, description, imgURL';
  const query = `query { menuItems(lat: ${0.0}, lng: ${0.0}) { ${fields} } }`;
  const result = await network.fetchQuery(query);
  return result.menuItems;*/
}
