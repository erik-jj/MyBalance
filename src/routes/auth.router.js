const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler.js');
const { emailReqSchema, passChangeSchema } = require('../schemas/user.schema');
const AuthService = require('../services/auth.service');
const UserService = require('../services/user.service');

const router = express.Router();

const authService = new AuthService();
const userService = new UserService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      if (user.verified) {
        res.json(await authService.signTokenAccount(user));
      } else {
        res.json(await userService.sendEmailVerification(user.email));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  validatorHandler(emailReqSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await authService.sendRecovery(email);
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
      const rta = await authService.changePassword(token, password);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
