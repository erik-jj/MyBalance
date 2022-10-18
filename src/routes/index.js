import express from 'express';

import reasonsRouter from './reasons.router.js';
import recurringRouter from './recurring.router.js';
import registersRouter from './registers.router.js';
import usersRouter from './users.router.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  app.use('/users', usersRouter);
  app.use('/reasons', reasonsRouter);
  app.use('/recurring', recurringRouter);
  app.use('/registers', registersRouter);
}

export default routerApi;
