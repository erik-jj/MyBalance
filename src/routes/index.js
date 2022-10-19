const express = require('express');

const reasonsRouter = require('./reasons.router.js');
const recurringRouter = require('./recurring.router.js');
const registersRouter = require('./registers.router.js');
const usersRouter = require('./users.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  app.use('/users', usersRouter);
  app.use('/reasons', reasonsRouter);
  app.use('/recurring', recurringRouter);
  app.use('/registers', registersRouter);
}

module.exports = routerApi;
