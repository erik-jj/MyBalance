const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  passRecoverySchema,
  passChangeSchema,
} = require('../schemas/user.schema');
const AuthService = require('../services/auth.service');
const router = express.Router();

const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signTokenAccount(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  validatorHandler(passRecoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/change-password',
  validatorHandler(passChangeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const rta = await service.changePassword(token, password);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
