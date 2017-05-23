
export class Network {

  baseURL: string;
  fetch: any;

  constructor(baseURL: string, _fetch) {
    this.baseURL = baseURL;
    this.fetch = _fetch;
  }

  async fetchQuery(query) {
    const res = await this.fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
  }
}
