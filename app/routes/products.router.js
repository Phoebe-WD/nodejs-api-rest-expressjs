// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
// Traemos nuestro servicio
const ProductService = require('../services/product.service');
// Creamos una instancia de nuestro servicio
const service = new ProductService();
// Traemos nuestro middleware validador
const validatorHandler = require('../middlewares/validator.handler');
// Traemos nuestro schemas
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');
// Creamos nuestro router
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    // const { size } = req.query;
    // Aquí enviamos nuestra respuesta
    res.json(products);
  } catch (err) {
    next(err);
  }
});
// Los endpoints especificos deben ir antes que los dinamicos
router.get('/filter', (req, res) => {
  res.send('yo soy un filter');
});
// Endpoint dinamico
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.delete(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
