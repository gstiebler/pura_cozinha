import 'whatwg-fetch';

async function fetchQuery(query) {
  const port = '3000';
  try {
    const res = await fetch('http://localhost:' + port + '/graphql', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(err);
  }
}

class Model {

  async getFoodMenuItems() {
    try {
      const fields = '_id, title, price, description, imgURL';
      const query = `query { menuItems(lat: 0.0, lng: 0.0) { ${fields} } }`;
      const result = await fetchQuery(query);
      return result.menuItems;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

}

const model = new Model();
export default model;
