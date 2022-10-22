const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().min(0).max(9999999);
const nextCreationDate = Joi.date().greater('1-1-2022');
//const lastCreationDate = Joi.date();
//const pending = Joi.boolean();
const idReason = Joi.number().integer();
const idUser = Joi.number().integer();

const createRecurringSchema = Joi.object({
  amount: amount.required(),
  idReason: idReason.required(),
  nextCreationDate: nextCreationDate.required(),
  idUser: idUser.required(),
});

const updateRecurringSchema = Joi.object({
  amount,
  idReason,
  nextCreationDate,
});

const getRecurringSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRecurringSchema,
  updateRecurringSchema,
  getRecurringSchema,
};
