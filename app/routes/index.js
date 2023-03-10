const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const ordersRouter = require('./orders.router');
const customerRouter = require('./customer.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/category', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/customers', customerRouter);
}

module.exports = routerApi;
