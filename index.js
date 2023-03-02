// Traemos express
const express = require('express');
// Traemos Faker
const faker = require('faker');
// Creamos nuestra app
const app = express();
// Declaramos nuestro puerto
const port = 5000;

/* Definimos nuestra ruta '/'
 Luego tenemos un callback que recibe dos parametros:
 'request y result'
 Nuestro callback ejecutará nuestra respuesta que enviaremos al cliente
 */
app.get('/', (req, res) => {
  // Aquí enviamos nuestra respuesta
  res.send('Hola mi server en express');
});
app.get('/nueva-ruta', (req, res) => {
  // Aquí enviamos nuestra respuesta
  res.send('Hola, soy una nueva ruta/endpoint');
});
app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  // Aquí enviamos nuestra respuesta
  res.json(products);
});
// Los endpoints especificos deben ir antes que los dinamicos
app.get('/products/filter', (req, res) => {
  res.send('yo soy un filter');
});
// Endpoint dinamico
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Botas',
    price: 2000,
  });
});

app.get('/categories', (req, res) => {
  // Aquí enviamos nuestra respuesta
  res.json([
    {
      category: 'Shoes',
      products: [],
    },
    {
      category: 'Boots',
      products: [],
    },
    {
      category: 'Slippers',
      products: [],
    },
  ]);
});
app.get('/categories/:categoryId/products/:productId', (req, res) => {
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
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('no hay parametros');
  }
  // Aquí enviamos nuestra respuesta
  // res.json([
  //   {
  //     userName: 'Chimbarongo',
  //   },
  //   {
  //     userName: 'Keka Galindo',
  //   },
  //   {
  //     userName: 'la tuya por si acaso',
  //   },
  // ]);
});
app.get('/users/:userId', (req, res) => {
  // Hacemos la consulta
  const { userId } = req.params;
  // Aquí enviamos nuestra respuesta
  res.json([
    {
      userId,
      userName: 'Chimbarongo',
    },
    {
      userId,
      userName: 'Keka Galindo',
    },
    {
      userId,
      userName: 'la tuya por si acaso',
    },
  ]);
});
app.get('/brands', (req, res) => {
  // Aquí enviamos nuestra respuesta
  res.json([
    {
      brand: 'Pepsi number one',
    },
    {
      brand: 'Coca number 2',
    },
    {
      brand: 'Inca Cola',
    },
  ]);
});
app.get('/brands/:brandId', (req, res) => {
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
/* Le decimos a nuestra app que escuche en el puerto que declaramos
Creamos un callback para que nos avisé que nuestra app está corriendo */
app.listen(port, () => {
  console.log(`Estoy corriendo en el puerto: http://localhost:${port}`);
});
