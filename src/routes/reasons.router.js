const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateReasonSchema,
  createReasonSchema,
  getReasonSchema,
} = require('../schemas/reasons.schema.js');

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
  validatorHandler(getReasonSchema, 'params'),
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
  validatorHandler(createReasonSchema, 'params'),
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
  validatorHandler(getReasonSchema, 'params'),
  validatorHandler(updateReasonSchema, 'body'),
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
  validatorHandler(getReasonSchema, 'params'),
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
