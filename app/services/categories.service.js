// Traemos Boom
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class CategoryService {
  constructor() {
    this.category = [];
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async find() {
    const category = await models.Category.findAll();
    return category;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: 'product',
    });
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
