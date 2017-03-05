import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import { schema } from './graphql_controller';
import * as db from './db';

db.init();

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000);