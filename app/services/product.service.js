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
  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.product.push(newProduct);
    return newProduct;
  }
  find() {
    return this.product;
  }
  findOne(id) {
    return this.product.find((item) => item.id === id);
  }
  update(id, changes) {
    const index = this.product.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    const product = this.product[index];
    this.product[index] = {
      ...product,
      ...changes,
    };
    return this.product[index];
  }
  delete(id) {
    const index = this.product.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.product.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
