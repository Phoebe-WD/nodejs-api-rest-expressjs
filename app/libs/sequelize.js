const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('../db/models/index');

let URI = '';
if (config.isProd) {
  URI = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASS = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setUpModels(sequelize);

// Lee los modelos y crea las tablas
// ! No se aconseja usarla en ambientes productivos.
// sequelize.sync();

module.exports = sequelize;
