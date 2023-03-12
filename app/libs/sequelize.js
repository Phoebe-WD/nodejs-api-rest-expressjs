const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = config.dbUrl;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setUpModels(sequelize);

// Lee los modelos y crea las tablas
// ! No se aconseja usarla en ambientes productivos.
// sequelize.sync();

module.exports = sequelize;
