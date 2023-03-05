// Traemos Faker
const faker = require('faker');
// Traemos Boom
const boom = require('@hapi/boom');
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
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.user.push(newUser);
    return newUser;
  }
  find() {
    const user = this.user;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject(boom.notFound('users not found'));
        }
        resolve(user);
      }, 2000);
    });
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
