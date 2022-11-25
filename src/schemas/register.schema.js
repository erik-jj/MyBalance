const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().min(1).max(9999999);
const idReason = Joi.number().integer();

const month = Joi.number().integer().min(1).max(12);
const year = Joi.number().integer().min(2020).max(2050);

const createRegisterSchema = Joi.object({
  amount: amount.required(),
  idReason: idReason.required(),
});

const updateRegisterSchema = Joi.object({
  amount: amount,
  idReason: idReason,
});

const getRegisterSchema = Joi.object({
  id: id.required(),
});

const queryRegisterSchema = Joi.object({
  month: month,
  year: year,
})
  .with('month', 'year')
  .with('year', 'month');

module.exports = {
  createRegisterSchema,
  updateRegisterSchema,
  getRegisterSchema,
  queryRegisterSchema,
};
