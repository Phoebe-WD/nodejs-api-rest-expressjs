const { User, UserSchema } = require('./user.model');
const { Products, ProductSchema } = require('./product.model');
const { Categories, CategorySchema } = require('./categories.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./orders.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Products.init(ProductSchema, Products.config(sequelize));
  Categories.init(CategorySchema, Categories.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Categories.associate(sequelize.models);
  Products.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setUpModels;
