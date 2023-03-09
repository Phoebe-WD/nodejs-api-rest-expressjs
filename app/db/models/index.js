const { User, UserSchema } = require('./user.model');
const { Products, ProductSchema } = require('./product.model');
const { Categories, CategorySchema } = require('./categories.model');
const { Brand, BrandSchema } = require('./brands.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./orders.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Products.init(ProductSchema, Products.config(sequelize));
  Categories.init(CategorySchema, Categories.config(sequelize));
  Brand.init(BrandSchema, Brand.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  // Categories.associate(sequelize.models);
  // Products.associate(sequelize.models);
  // Order.associate(sequelize.models);
}

module.exports = setUpModels;
