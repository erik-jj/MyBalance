const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(15).min(3);
const isIncome = Joi.boolean();
const isActive = Joi.boolean();
const idUser = Joi.number().integer();

const createReasonSchema = Joi.object({
  name: name.required(),
  isIncome: isIncome.required(),
  idUser: idUser.required(),
});

const updateReasonSchema = Joi.object({
  name: name,
  isActive: isActive,
});

const getReasonSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createReasonSchema,
  updateReasonSchema,
  getReasonSchema,
};
