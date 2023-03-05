const Joi = require('joi');

const id = Joi.string().uuid();
const userName = Joi.string().alphanum().min(3).max(30);
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const image = Joi.string().uri();

const createUserSchema = Joi.object({
  userName: userName.required(),
  email: email.required(),
  image: image.required(),
});
const updateUserSchema = Joi.object({
  userName: userName,
  email: email,
  image: image,
});
const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
