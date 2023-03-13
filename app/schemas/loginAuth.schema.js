const Joi = require('joi');

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const password = Joi.string().min(8);
const newPassword = Joi.string().min(8);
const token = Joi.string();

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryAuthSchema = Joi.object({
  email: email.required(),
});

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = { loginAuthSchema, recoveryAuthSchema, changePasswordSchema };
