// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
// Traemos nuestro servicio
const CategoryService = require('../services/categories.service');
// Creamos una instancia de nuestro servicio
const service = new CategoryService();
// Traemos nuestro middleware validador
const validatorHandler = require('../middlewares/validator.handler');
// Traemos nuestro schemas
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/categories.schema');
// Creamos nuestro router
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();

    // Aquí enviamos nuestra respuesta
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});
router.get(
  '/:categoryId/products/:productId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    // Hacemos la consulta
    try {
      const { categoryId, productId } = req.params;
      // Aquí enviamos nuestra respuesta
      res.json([
        {
          categoryId,
          productId,
          category: 'Shoes',
          products: [],
        },
        {
          categoryId,
          productId,
          category: 'Boots',
          products: [],
        },
        {
          categoryId,
          productId,
          category: 'Slippers',
          products: [],
        },
      ]);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const category = await service.create(body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const body = req.body;
      const category = await service.update(categoryId, body);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.delete(categoryId);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
