const Joi = require('joi');

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const password = Joi.string().min(8);

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

module.exports = loginAuthSchema;
