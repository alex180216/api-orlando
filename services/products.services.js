const boom = require("@hapi/boom");
const faker = require("faker");
const { getFakeDB, findProduct, findIndex } = require("../utils");

class ProductsServices {

  constructor() {
    this.products = getFakeDB()
  }

  async getAll() {
    return this.products;
  }

  async create(product){
    
    debugger
    
    const newProduct = {
      ...product,
      id: faker.datatype.uuid(),
      price: parseInt(product.price, 10),
    }
    
    this.products.push(newProduct)
    
    return newProduct;
  }
  
  async findOne(productId) {
    const foundProduct = findProduct(productId, this.products)
    if (foundProduct) {
      return foundProduct;
    }

    throw boom.notFound(`Product "${productId}" doesn't exist`)
  }

  async updateOne(productId, newProperties) {
    const foundIndex = findIndex(productId, this.products)
    
    if(foundIndex !== -1){
      const foundProduct = findProduct(productId, this.products)

      const newProduct = {
        id: productId,
        ...foundProduct,
        ...newProperties
      }
      
      this.products[foundIndex] = newProduct;
      
      return newProduct;
    }

    throw boom.notFound(`Product "${productId}" doesn't exist`)
  }

  async deleteOne(productId) {
    const foundIndex = findIndex(productId, this.products)

    if (foundIndex !== -1) {
      this.products.splice(foundIndex, 1)
      return ({ message: `Product "${productId}" has been deleted` })
    }

    throw boom.notFound(`Product "${productId}" doesn't exist`)
  }
}

module.exports = ProductsServices;