const express = require("express");
const { validationHandler } = require("../middlewares/validation.handler");
const { getProductSchema, updateProductSchema, createProductSchema } = require("../schemas/products.schemas");
const router = express.Router()
const ProductsServices = require("../services/products.services");

const products = new ProductsServices()

router.get("/", async (request, response, next) => {
  try {

    const allProducts = await products.getAll()
    response.status(200).json(allProducts)

  } catch (error) {
    next(error)
  }
})


router.post("/",
  validationHandler(createProductSchema, "body"),
  async (request, response, next) => {
    try {
      
      const product = await products.create(request.body)
      response.status(201).json(product)
      
    } catch (error) {
      next(error)
    }
  }
)

router.get("/:id",
  validationHandler(getProductSchema, "params"),
  async (request, response, next) => {
    try {

      const foundProduct = await products.findOne(request.params.id)
      response.status(200).json(foundProduct)

    } catch (error) {
      next(error)
    }
  }
)

router.put("/:id",
  validationHandler(getProductSchema, "params"),
  validationHandler(updateProductSchema, "body"),
  async (request, response, next) => {
    try {
      const productId = request.params.id;
      const newProperties = request.body;

      const updatedProduct = await products.updateOne(productId, newProperties)
      response.json(updatedProduct)

    } catch (error) {
      next(error)
    }
  }
)

router.delete("/:id", async (request, response, next) => {
  try {

    await products.deleteOne(request.params.id)
    response.status(204).json()

  } catch (error) {
    next(error)
  }
})

module.exports = router