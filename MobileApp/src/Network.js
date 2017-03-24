
export class Network {

  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchQuery(query) {
    try {
      const res = await fetch(this.baseURL, {
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
}
