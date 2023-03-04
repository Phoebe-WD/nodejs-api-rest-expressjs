// Traemos Faker
const faker = require('faker');
class BrandService {
  constructor() {
    this.brand = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.brand.push({
        id: faker.datatype.uuid(),
        brandName: faker.company.companyName(),
      });
    }
  }
  create(data) {
    const newBrand = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.brand.push(newBrand);
    return newBrand;
  }
  find() {
    return this.brand;
  }
  findOne(id) {
    return this.brand.find((item) => item.id === id);
  }
  update(id, changes) {
    const index = this.brand.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('brand not found');
    }
    const brand = this.brand[index];
    this.brand[index] = {
      ...brand,
      ...changes,
    };
    return this.brand[index];
  }
  delete(id) {
    const index = this.brand.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.brand.splice(index, 1);
    return { id };
  }
}

module.exports = BrandService;
