// Traemos express
const express = require('express');
// Traemos CORS
const cors = require('cors');
//importamos nuestro router
const routerApi = require('../routes');
// Importamos nuestros middlewares
const {
  logError,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('../middlewares/error.handler');
const { checkApiKey } = require('../middlewares/auth.handler');
// Creamos nuestra app
const app = express();
// Declaramos nuestro puerto
const port = process.env.PORT || 5000;
// Creamos nuestro middleware interno de express
app.use(express.json());
const whitelist = [
  'http://localhost:8080',
  '127.0.0.1:5432',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'https://myapp.cl',
  'http://localhost:5000',
  'http://localhost:4000',
];
const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('no permitido'));
    }
  },
};
app.use(cors(options));
/* Definimos nuestra ruta '/'
 Luego tenemos un callback que recibe dos parametros:
 'request y result'
 Nuestro callback ejecutará nuestra respuesta que enviaremos al cliente
 */
app.get('/', (req, res) => {
  // Aquí enviamos nuestra respuesta
  res.send('Hola desde mi server en express');
});
app.get('/nueva-ruta', checkApiKey, (req, res) => {
  // Aquí enviamos nuestra respuesta
  res.send('Hola, soy una nueva ruta/endpoint');
});
const passport = require('passport');
// Antes de nuestras rutas debemos de colocar esto
app.use(passport.initialize());
routerApi(app);
require('../utils/auth');
// Utilizamos los middleware.
// !Siempre deben ir después del routing:
// * Se ejecutan según el orden
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
/* Le decimos a nuestra app que escuche en el puerto que declaramos
Creamos un callback para que nos avisé que nuestra app está corriendo */
app.listen(port, () => {
  console.log(`Estoy corriendo en el puerto: http://localhost:${port}`);
});
