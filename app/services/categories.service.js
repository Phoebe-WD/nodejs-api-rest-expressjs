// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');
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
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.category.push(newCategory);
    return newCategory;
  }
  find() {
    const category = this.category;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!category) {
          reject(boom.notFound('categories not found'));
        }
        resolve(category);
      }, 2000);
    });
  }
  async findOne(id) {
    return this.category.find((item) => item.id === id);
  }
  async update(id, changes) {
    const index = this.category.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    const category = this.category[index];
    this.category[index] = {
      ...category,
      ...changes,
    };
    return this.category[index];
  }
  async delete(id) {
    const index = this.category.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    this.category.splice(index, 1);
    return { id };
  }
}

module.exports = CategoryService;
