const express = require('express');

const ReasonService = require('../services/reasons.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateReasonSchema,
  createReasonSchema,
  getReasonSchema,
} = require('../schemas/reasons.schema.js');

const router = express.Router();
const service = new ReasonService();
router.get(
  '/:id',
  validatorHandler(getReasonSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reasons = await service.findById(id);
      res.json(reasons);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createReasonSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newReason = await service.create(body);
      res.json(newReason);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getReasonSchema, 'params'),
  validatorHandler(updateReasonSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const reason = await service.update(id, body);
      res.json(reason);
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
      const { id } = req.params;
      const reason = await service.deactivate(id);
      res.json(reason);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
