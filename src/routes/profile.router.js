const express = require('express');
const passport = require('passport');
const RegisterService = require('../services/registers.service');
const RecurringService = require('../services/recurring.service');
const ReasonService = require('../services/reasons.service');

const validatorHandler = require('../middlewares/validator.handler.js');
const { queryRegisterSchema } = require('../schemas/register.schema');

const router = express.Router();
const registerService = new RegisterService();
const recurringService = new RecurringService();
const reasonService = new ReasonService();

router.get(
  '/user-registers',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(queryRegisterSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const registers = await registerService.findRegisters(
        user.sub,
        req.query
      );
      res.json(registers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/user-recurring',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const recurring = await recurringService.findByUserId(user.sub);
      res.json(recurring);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/user-reasons',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const reasons = await reasonService.findByUserId(user.sub);
      res.json(reasons);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
