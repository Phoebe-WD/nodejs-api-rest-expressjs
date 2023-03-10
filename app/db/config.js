const { config } = require('../config/config');

// const USER = encodeURIComponent(config.dbUser);
// const PASS = encodeURIComponent(config.dbPassword);
const Rail = config.dbRail;
const URI = Rail;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
