const { Pool } = require('pg');
const { config } = require('../config/config');
let URI = '';
if (config.isProd) {
  URI = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASS = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const pool = new Pool({ connectionString: URI });

module.exports = pool;
