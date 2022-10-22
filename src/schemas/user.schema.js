const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const username = Joi.string().min(3).max(15);
const password = Joi.string().min(8).max(15);

const createUserSchema = Joi.object({
  email:email.required(),
  username:username.required(),
  password:password.required()
});

const updateUserSchema = Joi.object({
 // email:email,
  username:username,
  password:password
});

const getUserSchema = Joi.object({
  id:id.required()
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema}
