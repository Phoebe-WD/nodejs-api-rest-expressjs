const Joi = require('joi');

const id = Joi.number().integer();
const categoryName = Joi.string().min(3).max(15).required();

const createCategorySchema = Joi.object({
  categoryName: categoryName,
});
const updateCategorySchema = Joi.object({
  categoryName: categoryName,
});
const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
