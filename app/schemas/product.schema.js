const Joi = require('joi');

const id = Joi.string().uuid();
const productName = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const imageUrl = Joi.string().uri();

const createProductSchema = Joi.object({
  productName: productName.required(),
  price: price.required(),
  imageUrl: imageUrl.required(),
});
const updateProductSchema = Joi.object({
  productName: productName,
  price: price,
  imageUrl: imageUrl,
});
const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
