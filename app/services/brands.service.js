// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
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
    const newBrand = await models.Brand.create(data);
    return newBrand;
  }
  async find() {
    const rta = await models.Brand.findAll();
    return rta;
  }
  async findOne(id) {
    const brand = await models.Brand.findByPk(id);
    if (!brand) {
      throw boom.notFound('brand not found');
    }
    return brand;
  }
  async update(id, changes) {
    const brand = this.findOne(id);
    const rta = await (await brand).update(changes);
    return rta;
  }
  async delete(id) {
    const brand = this.findOne(id);
    await brand.destroy();
    return { id };
  }
}

module.exports = BrandService;
