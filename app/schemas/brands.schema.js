const Joi = require('joi');

const id = Joi.number().integer();
const brandName = Joi.string().min(3).max(15).required();

const createBrandSchema = Joi.object({
  brandName: brandName,
});
const updateBrandSchema = Joi.object({
  brandName: brandName,
});
const getBrandSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createBrandSchema,
  updateBrandSchema,
  getBrandSchema,
};
