// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');
// const pool = require('../libs/postgres.pool');
// const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');
class UserService {
  constructor() {
    this.user = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.user.push({
        id: faker.datatype.uuid(),
        image: faker.internet.avatar(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }
  async find() {
    const rta = await models.User.findAll();
    return rta;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
