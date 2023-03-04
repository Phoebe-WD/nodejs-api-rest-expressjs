// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
const UserService = require('../services/users.service');
// Creamos una instancia de nuestro servicio
const service = new UserService();
// Creamos nuestro router
const router = express.Router();
router.get('/', (req, res) => {
  const users = service.find();
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.status(200).json(users);
  } else {
    res.send('no hay parametros');
  }
});
router.get('/:userId', (req, res) => {
  // Hacemos la consulta
  const { userId } = req.params;
  const user = service.findOne(userId);
  // Aquí enviamos nuestra respuesta
  res.status(200).json(user);
});
router.post('/', (req, res) => {
  const body = req.body;
  const user = service.create(body);
  res.status(201).json(user);
});
router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  const user = service.update(userId, body);
  res.json(user);
});
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const user = service.delete(userId);
  res.json(user);
});
module.exports = router;
