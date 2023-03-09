// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
class ProductService {
  constructor() {
    this.product = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.product.push({
        id: faker.datatype.uuid(),
        productName: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
  async find() {
    const rta = await models.Product.findAll();
    return rta;
  }
  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    // if (product.isBlock) {
    //   throw boom.locked('product is locked');
    // }
    return product;
  }
  async update(id, changes) {
    const product = await models.Product.findByPk(id);
    const rta = await product.update(changes);
    return rta;
  }
  async delete(id) {
    const product = await models.Product.findByPk(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;
