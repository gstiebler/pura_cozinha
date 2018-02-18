var Twit = require('twit')

var T = new Twit({
  consumer_key:         'P1LU8nRE33AHxPCP6RoS2ViHE',
  consumer_secret:      'qGVO54retGpiEGRHH0irMv5OAA0PJE13pCD5NeRvMdAUp5bpZ3',
  access_token:         '965242661077766144-LXStYJmxdKGHKxtxsi4nERmeX8acFYs',
  access_token_secret:  'gOjNQOlz3XlZKKux5ifxmYuUMau350xS9lxUOCmMsSiKG',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data);
});