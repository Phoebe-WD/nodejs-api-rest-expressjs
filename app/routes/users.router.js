// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
const UserService = require('../services/users.service');
// Creamos una instancia de nuestro servicio
const service = new UserService();
// Traemos nuestro middleware validador
const validatorHandler = require('../middlewares/validator.handler');
// Traemos nuestro schemas
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/users.schema');
// Creamos nuestro router
const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    // const { limit, offset } = req.query;
    // if (limit && offset) {
    //   res.status(200).json(users);
    // } else {
    //   res.send('no hay parametros');
    // }
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      // Hacemos la consulta
      const { id } = req.params;
      const user = await service.findOne(id);
      // Aquí enviamos nuestra respuesta
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.create(body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
