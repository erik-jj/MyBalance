const express = require('express');
const RegisterService = require('../services/registers.service');

const router = express.Router();
const service = new RegisterService();
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateRegisterSchema,
  createRegisterSchema,
  getRegisterSchema,
} = require('../schemas/register.schema');

router.get(
  '/:id',
  validatorHandler(getRegisterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const register = await service.findById(id);
      res.json(register);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createRegisterSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRegister = await service.create(body);
      res.json(newRegister);
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
      const body = req.body;
      const { id } = req.params;
      const register = await service.update(id, body);
      res.json(register);
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
      const { id } = req.params;
      const register = await service.delete(id);
      res.json(register);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
