// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
// Traemos nuestro servicio
const BrandService = require('../services/brands.service');
// Creamos una instancia de nuestro servicio
const service = new BrandService();
// Traemos nuestro middleware validador
const validatorHandler = require('../middlewares/validator.handler');
// Traemos nuestro schemas
const {
  createBrandSchema,
  updateBrandSchema,
  getBrandSchema,
} = require('../schemas/brands.schema');
// Creamos nuestro router
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const brands = await service.find();
    // Aquí enviamos nuestra respuesta
    res.status(200).json(brands);
  } catch (err) {
    next(err);
  }
});
router.get(
  '/:id',
  validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      // Hacemos la consulta
      const { id } = req.params;
      const brand = await service.findOne(id);
      // Aquí enviamos nuestra respuesta
      res.status(200).json(brand);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  validatorHandler(createBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBrand = await service.create(body);
      res.status(201).json(newBrand);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(getBrandSchema, 'params'),
  validatorHandler(updateBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const brand = await service.update(id, body);
      res.json(brand);
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const brand = await service.delete(id);
      res.json(brand);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
