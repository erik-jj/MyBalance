const express = require('express');

const reasonsRouter = require('./reasons.router.js');
const recurringRouter = require('./recurring.router.js');
const registersRouter = require('./registers.router.js');
const usersRouter = require('./users.router.js');
const authRouter = require('./auth.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/users', usersRouter);
  router.use('/reasons', reasonsRouter);
  router.use('/recurring', recurringRouter);
  router.use('/registers', registersRouter);
}

module.exports = routerApi;
