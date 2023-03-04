// Traemos Faker
const faker = require('faker');
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
      });
    }
  }
  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.user.push(newUser);
    return newUser;
  }
  find() {
    return this.user;
  }
  findOne(id) {
    return this.user.find((item) => item.id === id);
  }
  update(id, changes) {
    const index = this.user.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('user not found');
    }
    const user = this.user[index];
    this.user[index] = {
      ...user,
      ...changes,
    };
    return this.user[index];
  }
  delete(id) {
    const index = this.user.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('user not found');
    }
    this.user.splice(index, 1);
    return { id };
  }
}

module.exports = UserService;
