const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const mySecret = config.mySecret;

// !siempre debe estar oculto por variables de entorno y solo el BACK debe saber la llave Secret
const secret = mySecret;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODY1MDUyN30.iSyHwL7k6-hsZNQhckPgsfdCz_XpDhm68MJOcjyWpls';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);

// * Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODY0OTgxNH0.GBlnZVlW040Yab6_vsvGuTTuXVqI9vmje7xBZvpLL-A
