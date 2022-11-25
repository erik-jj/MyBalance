const express = require('express');
const passport = require('passport');
const ReasonService = require('../services/reasons.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateReasonSchema,
  createReasonSchema,
  getReasonSchema,
} = require('../schemas/reasons.schema.js');

const router = express.Router();
const service = new ReasonService();
// router.get(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   validatorHandler(getReasonSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const reasons = await service.findById(id);
//       res.json(reasons);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const reasons = await service.findByUserId(user.sub);
      res.json(reasons);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createReasonSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const newReason = await service.create(user, body);
      res.json(newReason);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getReasonSchema, 'params'),
  validatorHandler(updateReasonSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const user = req.user;
      const reason = await service.update(id, body, user.sub);
      res.json(reason);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getReasonSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const reason = await service.deactivate(id, user.sub);
      res.json(reason);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
