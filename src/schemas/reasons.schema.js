const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(20).min(3);
const isIncome = Joi.boolean();
//const isActive = Joi.boolean();

const createReasonSchema = Joi.object({
  name: name.required(),
  isIncome: isIncome.required(),
});

const updateReasonSchema = Joi.object({
  name: name,
  isIncome: isIncome,
});

const getReasonSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createReasonSchema,
  updateReasonSchema,
  getReasonSchema,
};
