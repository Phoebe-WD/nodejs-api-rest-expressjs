'use strict';

const { BRANDS_TABLE } = require('../models/brands.model');
const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.dropTable(BRANDS_TABLE);
    await queryInterface.removeColumn(PRODUCT_TABLE, 'brandName');
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
