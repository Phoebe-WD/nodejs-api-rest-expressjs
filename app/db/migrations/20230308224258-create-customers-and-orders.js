'use strict';
// const { ORDER_TABLE, OrderSchema } = require('../models/orders.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    // await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
