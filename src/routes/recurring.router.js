const express = require('express');

const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateRecurringSchema,
  createRecurringSchema,
  getRecurringSchema,
} = require('../schemas/recurring.schema');
router.get('/', async (req, res, next) => {
  try {
    //logic
    res.json();
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getRecurringSchema, 'params'),
  async (req, res, next) => {
    try {
      //logic
      res.json();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createRecurringSchema, 'params'),
  async (req, res, next) => {
    try {
      //logic
      res.json();
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  ':/id',
  validatorHandler(getRecurringSchema, 'params'),
  validatorHandler(updateRecurringSchema, 'body'),
  async (req, res, next) => {
    try {
      //logic
      res.json();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getRecurringSchema, 'params'),
  async (req, res, next) => {
    try {
      //logic
      res.json();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
