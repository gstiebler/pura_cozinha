import * as Twit from 'twit';

const twitObj = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

function sendTwitAsync(message: string) {
  return new Promise((resolve, reject) => {
    twitObj.post('statuses/update', { status: message }, (err, data, response) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data, response });
      }
    });
  });
}

export function sendTwit(message: string) {
  return sendTwitAsync(message);
}
