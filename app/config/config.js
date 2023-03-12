require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 5000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbEngine: process.env.DB_ENGINE,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  mySecret: process.env.MY_SECRET,
};

module.exports = { config };
