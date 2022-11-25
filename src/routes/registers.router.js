const express = require('express');
const RegisterService = require('../services/registers.service');
const passport = require('passport');

const router = express.Router();
const service = new RegisterService();
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateRegisterSchema,
  createRegisterSchema,
  getRegisterSchema,
  queryRegisterSchema,
} = require('../schemas/register.schema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(queryRegisterSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const registers = await service.findRegisters(user.sub, req.query);
      res.json(registers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(queryRegisterSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const registers = await service.loadDashboardData(user.sub);
      res.json(registers);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createRegisterSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const newRegister = await service.create(user.sub, body);
      res.json(newRegister);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getRegisterSchema, 'params'),
  validatorHandler(updateRegisterSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const user = req.user;
      const register = await service.update(id, body, user.sub);
      res.json(register);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getRegisterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const register = await service.delete(id, user.sub);
      res.json(register);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
