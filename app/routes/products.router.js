// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
// Traemos nuestro servicio
const ProductService = require('../services/product.service');
// Creamos una instancia de nuestro servicio
const service = new ProductService();
// Creamos nuestro router
const router = express.Router();

router.get('/', (req, res) => {
  const products = service.find();
  // const { size } = req.query;
  // Aquí enviamos nuestra respuesta
  res.json(products);
});
// Los endpoints especificos deben ir antes que los dinamicos
router.get('/filter', (req, res) => {
  res.send('yo soy un filter');
});
// Endpoint dinamico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  });
});
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id,
  });
});

module.exports = router;
