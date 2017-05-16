import * as fetch from 'node-fetch';

export function fetchSync(url, options): Promise<any> {
  return new Promise((accept, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        accept(json);
      })
      .catch(err => { reject(err); });
  });
}
