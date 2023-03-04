// Traemos Faker
const faker = require('faker');
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
  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.category.push(newCategory);
    return newCategory;
  }
  find() {
    return this.category;
  }
  findOne(id) {
    return this.category.find((item) => item.id === id);
  }
  update(id, changes) {
    const index = this.category.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('category not found');
    }
    const category = this.category[index];
    this.category[index] = {
      ...category,
      ...changes,
    };
    return this.category[index];
  }
  delete(id) {
    const index = this.category.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('category not found');
    }
    this.category.splice(index, 1);
    return { id };
  }
}

module.exports = CategoryService;
