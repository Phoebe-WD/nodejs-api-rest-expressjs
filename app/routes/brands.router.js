// Traemos express
const express = require('express');
// Traemos Faker
const faker = require('faker');
// Creamos nuestro router
const router = express.Router();

router.get('/', (req, res) => {
  const brands = [];
  for (let i = 0; i < 50; i++) {
    brands.push({
      brandName: faker.company.companyName(),
    });
  }
  // Aquí enviamos nuestra respuesta
  res.status(200).json(brands);
});
router.get('/:brandId', (req, res) => {
  // Hacemos la consulta
  const { brandId } = req.params;
  // Aquí enviamos nuestra respuesta
  res.json([
    {
      brandId,
      brand: 'Pepsi number one',
    },
    {
      brandId,
      brand: 'Coca number 2',
    },
    {
      brandId,
      brand: 'Inca Cola',
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
router.patch('/:brandId', (req, res) => {
  const { brandId } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    brandId,
  });
});
router.put('/:brandId', (req, res) => {
  const { brandId } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    brandId,
  });
});
router.delete('/:brandId', (req, res) => {
  const { brandId } = req.params;
  res.json({
    message: 'delete',
    brandId,
  });
});
module.exports = router;
