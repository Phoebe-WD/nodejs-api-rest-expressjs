const { Pool } = require('pg');
const { config } = require('../config/config');

//   const USER = encodeURIComponent(config.dbUser);
//   const PASS = encodeURIComponent(config.dbPassword);
//  const  URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = config.dbUrl;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
