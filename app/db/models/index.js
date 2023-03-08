const { User, UserSchema } = require('./user.model');
const { Products, ProductSchema } = require('./product.model');
const { Categories, CategorySchema } = require('./categories.model');
const { Brand, BrandSchema } = require('./brands.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Products.init(ProductSchema, Products.config(sequelize));
  Categories.init(CategorySchema, Categories.config(sequelize));
  Brand.init(BrandSchema, Brand.config(sequelize));
}

module.exports = setUpModels;
