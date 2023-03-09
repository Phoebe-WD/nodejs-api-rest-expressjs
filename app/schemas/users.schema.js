const Joi = require('joi');

const id = Joi.number().integer();
const userName = Joi.string().alphanum().min(3).max(30);
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const image = Joi.string().uri();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  userName: userName.required(),
  email: email.required(),
  password: password.required(),
  image: image,
  role: role.required(),
});
const updateUserSchema = Joi.object({
  email: email,
  userName: userName,
  image: image,
  role: role,
});
const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
