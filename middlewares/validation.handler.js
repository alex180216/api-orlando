const boom = require("@hapi/boom")

const validationHandler = (schema, type) => {
  return (request, response, next) => {
    const data = request[type]
    const { error } = schema.validate(data, { abortEarly: false })
    debugger
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = { validationHandler }