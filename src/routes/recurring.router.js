const express = require('express');
const RecurringService = require('../services/recurring.service');
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateRecurringSchema,
  createRecurringSchema,
  getRecurringSchema,
} = require('../schemas/recurring.schema');

const router = express.Router();
const service = new RecurringService();

router.get(
  '/:id',
  validatorHandler(getRecurringSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const recurring = await service.findById(id);
      res.json(recurring);
    } catch (error) {
      next(error);
    }
  }
);


// router.get(
//   '/today-recurring',
//   async (req, res, next) => {
//     try {
//       const recurring = await service.findTodayRecurring();
//       res.json(recurring);
//     } catch (error) {
//       next(error);
//     }
//   }
// );


router.post(
  '/',
  validatorHandler(createRecurringSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRecurring = await service.create(body);
      res.json(newRecurring);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getRecurringSchema, 'params'),
  validatorHandler(updateRecurringSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const recurring = await service.update(id, body);
      res.json(recurring);
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
      const { id } = req.params;
      const recurring = await service.delete(id);
      res.json(recurring);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
