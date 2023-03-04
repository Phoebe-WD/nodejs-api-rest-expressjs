// Traemos express
const express = require('express');
//importamos nuestro router
const routerApi = require('../routes');
// Creamos nuestra app
const app = express();
// Declaramos nuestro puerto
const port = 5000;
// Creamos nuestro middleware interno de express
app.use(express.json());
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
routerApi(app);

/* Le decimos a nuestra app que escuche en el puerto que declaramos
Creamos un callback para que nos avisé que nuestra app está corriendo */
app.listen(port, () => {
  console.log(`Estoy corriendo en el puerto: http://localhost:${port}`);
});
