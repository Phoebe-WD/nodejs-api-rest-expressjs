// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
// Traemos nuestro servicio
const CategoryService = require('../services/categories.service');
// Creamos una instancia de nuestro servicio
const service = new CategoryService();
// Creamos nuestro router
const router = express.Router();

router.get('/', (req, res) => {
  const categories = service.find();

  // Aquí enviamos nuestra respuesta
  res.status(200).json(categories);
});
router.get('/:categoryId/products/:productId', (req, res) => {
  // Hacemos la consulta
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
});
router.post('/', (req, res) => {
  const body = req.body;
  const category = service.create(body);
  res.status(201).json(category);
});
router.patch('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  const category = service.update(categoryId, body);
  res.json(category);
});

router.delete('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const category = service.delete(categoryId);
  res.json(category);
});
module.exports = router;
