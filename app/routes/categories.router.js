// Traemos express
const express = require('express');
// Traemos Faker
const faker = require('faker');
// Creamos nuestro router
const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  for (let i = 0; i < 100; i++) {
    categories.push({
      categoryName: faker.commerce.department(),
      products: [],
    });
  }
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
  res.status(201).json({
    message: 'created',
    data: body,
  });
});
router.patch('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    categoryId,
  });
});
router.put('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    categoryId,
  });
});
router.delete('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    message: 'delete',
    categoryId,
  });
});
module.exports = router;
