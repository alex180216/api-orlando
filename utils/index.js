const faker = require("faker")

const getFakeDB = () => {
  let array = Array(10).fill(0)

  array = array.map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.imageUrl()
  }));

  return array;
}

const findIndex = (productId, products) => {
  const foundIndex = products.findIndex(product => product.id === productId)
  return foundIndex;
}
const findProduct = (productId, products) => {
  const foundProduct = products.find(product => product.id === productId)
  return foundProduct;
}

module.exports = { getFakeDB, findIndex, findProduct }