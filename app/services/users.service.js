// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
// const getConnection = require('../libs/postgres');
class UserService {
  constructor() {
    this.user = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    });
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
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.user.push(newUser);
    return newUser;
  }
  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }
  async findOne(id) {
    const user = this.user.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    if (user.isBlock) {
      throw boom.locked('user is locked');
    }
    return user;
  }
  async update(id, changes) {
    const index = this.user.findIndex((item) => item.id === id);
    const user = this.user[index];
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    if (user.isBlock) {
      throw boom.locked('user is locked');
    }
    this.user[index] = {
      ...user,
      ...changes,
    };
    return this.user[index];
  }
  async delete(id) {
    const index = this.user.findIndex((item) => item.id === id);
    const user = this.user[index];
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    if (user.isBlock) {
      throw boom.locked('user is locked');
    }
    this.user.splice(index, 1);
    return { id };
  }
}

module.exports = UserService;
