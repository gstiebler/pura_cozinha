
export class Network {

  private baseApiURL: string;
  private fetch: any;

  constructor(baseApiURL: string, _fetch: any) {
    this.baseApiURL = baseApiURL;
    this.fetch = _fetch;
  }

  async fetchQuery(query) {
    try {
      const fetch_fn = this.fetch;
      const res = await fetch_fn(this.baseApiURL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ query })
      });
      const json = await res.json();
      if(json.errors) {
        throw new Error(JSON.stringify(json.errors));
      }
      return json.data;
    } catch (err) {
      console.error(err);
      throw new Error(JSON.stringify(err));
    }
  }

};