// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class CategoryService {
  constructor() {
    this.category = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.category.push({
        id: faker.datatype.uuid(),
        categoryName: faker.commerce.department(),
        products: [],
      });
    }
  }
  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }
  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }
  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
