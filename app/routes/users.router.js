// Traemos express
const express = require('express');
// Traemos Faker
const faker = require('faker');
// Creamos nuestro router
const router = express.Router();
router.get('/', (req, res) => {
  const users = [];
  const { limit, offset } = req.query;
  for (let i = 0; i < 100; i++) {
    users.push({
      image: faker.internet.avatar(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
    });
  }
  if (limit && offset) {
    res.json(users);
  } else {
    res.send('no hay parametros');
  }
});
router.get('/:userId', (req, res) => {
  // Hacemos la consulta
  const { userId } = req.params;
  // Aquí enviamos nuestra respuesta
  if (userId === '101') {
    res.status(404).json({
      message: 'not found',
    });
  } else {
    res.status(200).json([
      {
        userId,
        userName: 'la tuya por si acaso',
      },
    ]);
  }
});
router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  });
});
router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    userId,
  });
});
router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    userId,
  });
});
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    message: 'delete',
    userId,
  });
});
module.exports = router;
