import 'whatwg-fetch';

export async function fetchQuery(query: String): Promise<any> {
  try {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
  } catch (err) {
    console.error(err);
    throw new Error(JSON.stringify(err));
  }
}
