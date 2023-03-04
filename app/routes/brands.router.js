// Traemos express
const express = require('express');
// Traemos Faker
// const faker = require('faker');
// Traemos nuestro servicio
const BrandService = require('../services/brands.service');
// Creamos una instancia de nuestro servicio
const service = new BrandService();
// Creamos nuestro router
const router = express.Router();

router.get('/', (req, res) => {
  const brands = service.find();

  // Aquí enviamos nuestra respuesta
  res.status(200).json(brands);
});
router.get('/:brandId', (req, res) => {
  // Hacemos la consulta
  const { brandId } = req.params;
  const brand = service.findOne(brandId);
  // Aquí enviamos nuestra respuesta
  res.status(200).json(brand);
});
router.post('/', (req, res) => {
  const body = req.body;
  const newBrand = service.create(body);
  res.json(newBrand);
});
router.patch('/:brandId', (req, res) => {
  const { brandId } = req.params;
  const body = req.body;
  const brand = service.update(brandId, body);
  res.json(brand);
});
router.delete('/:brandId', (req, res) => {
  const { brandId } = req.params;
  const brand = service.delete(brandId);
  res.json(brand);
});
module.exports = router;
