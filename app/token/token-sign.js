const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const mySecret = config.mySecret;
// !siempre debe estar oculto por variables de entorno y solo el BACK debe saber la llave Secret
const secret = mySecret;
const jwtConfig = {
  expiresIn: '2d',
};
// Es lo  que vamos a encriptar dentro del software
// ! Nunca guardar información importante dentro del 'payload'
const payload = {
  sub: 1,
  role: 'admin',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret, jwtConfig);
console.log(token);

// * Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODY0OTgxNH0.GBlnZVlW040Yab6_vsvGuTTuXVqI9vmje7xBZvpLL-A
