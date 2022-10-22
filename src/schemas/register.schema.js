const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().min(0).max(9999999);
const idReason = Joi.number().integer();
const idUser = Joi.number().integer();

const createRegisterSchema = Joi.object({
  amount: amount.required(),
  idReason: idReason.required(),
  idUser: idUser.required(),
});

const updateRegisterSchema = Joi.object({
  amount: amount,
  idReason: idReason,
});

const getRegisterSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRegisterSchema,
  updateRegisterSchema,
  getRegisterSchema,
};
