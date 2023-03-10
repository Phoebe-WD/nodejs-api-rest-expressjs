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
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    // Hacemos la consulta
    try {
      const { id } = req.params;
      // Aquí enviamos nuestra respuesta
      const category = await service.findOne(id);
      res.json(category);
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
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.delete(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
