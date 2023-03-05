// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');
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
  async create(data) {
    const newBrand = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.brand.push(newBrand);
    return newBrand;
  }
  find() {
    const brand = this.brand;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!brand) {
          reject(boom.notFound('brands not found'));
        }
        resolve(brand);
      }, 2000);
    });
  }
  async findOne(id) {
    const brand = this.brand.find((item) => item.id === id);
    if (!brand) {
      throw boom.notFound('brand not found');
    }
    return brand;
  }
  async update(id, changes) {
    const index = this.brand.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('brand not found');
    }
    const brand = this.brand[index];
    this.brand[index] = {
      ...brand,
      ...changes,
    };
    return this.brand[index];
  }
  async delete(id) {
    const index = this.brand.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('brand not found');
    }
    this.brand.splice(index, 1);
    return { id };
  }
}

module.exports = BrandService;
