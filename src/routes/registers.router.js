const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateRegisterSchema,
  createRegisterSchema,
  getRegisterSchema,
} = require('../schemas/register.schema');

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
  validatorHandler(getRegisterSchema, 'params'),
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
  validatorHandler(createRegisterSchema, 'params'),
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
  '/:id',
  validatorHandler(getRegisterSchema, 'params'),
  validatorHandler(updateRegisterSchema, 'body'),
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
  validatorHandler(getRegisterSchema, 'params'),
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
