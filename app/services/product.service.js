// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');
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
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.product.push(newProduct);
    return newProduct;
  }
  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }
  async findOne(id) {
    const product = this.product.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.locked('product is locked');
    }
    return product;
  }
  async update(id, changes) {
    const index = this.product.findIndex((item) => item.id === id);
    const product = this.product[index];
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.locked('product is locked');
    }

    this.product[index] = {
      ...product,
      ...changes,
    };
    return this.product[index];
  }
  async delete(id) {
    const index = this.product.findIndex((item) => item.id === id);
    const product = this.product[index];
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.locked('product is locked');
    }
    this.product.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
