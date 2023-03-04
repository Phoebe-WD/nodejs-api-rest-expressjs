// Traemos Faker
const faker = require('faker');
class ProductService {
  constructor() {
    this.product = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.product.push({
        id: faker.datatype.uuid(),
        productName: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
      });
    }
  }
  create() {}
  find() {
    return this.product;
  }
  findOne(id) {
    return this.product.find((item) => item.id === id);
  }
  update() {}
  delete() {}
}

module.exports = ProductService;
