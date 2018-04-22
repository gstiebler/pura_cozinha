import * as express from 'express';

export default function (app: express.Express) {
  
  app.get('/orders', async (req: express.Request, res: express.Response) => {
    res.send({ orders: 'orders**' + req.params.a });
  });

}