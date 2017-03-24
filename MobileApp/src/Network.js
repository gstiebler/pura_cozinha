
export class Network {

  constructor(baseURL, _fetch) {
    this.baseURL = baseURL;
    this.fetch = _fetch;
  }

  async fetchQuery(query) {
    try {
      const res = await this.fetch(this.baseURL, {
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
