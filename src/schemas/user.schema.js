const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const username = Joi.string().min(3).max(15);
const password = Joi.string().min(8).max(15);
const token = Joi.string();
const createUserSchema = Joi.object({
  email: email.required(),
  username: username.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  username: username,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const emailReqSchema = Joi.object({
  email: email.required(),
});

const passChangeSchema = Joi.object({
  password: password.required(),
  token: token.required(),
});

const tokenReqSchema = Joi.object({
  token: token.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  emailReqSchema,
  passChangeSchema,
  tokenReqSchema,
};
