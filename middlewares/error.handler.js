const logErrors = (error, request, response, next) => {
  console.log("logErrors")
  console.error(error)
  next(error)
}

const boomHandler = (error, request, response, next) => {
  if (error.isBoom) {
    const { output } = error;
    response.status(output.statusCode).json(output.payload)
  }
  
  next(error)
}

const errorHandler = (error, request, response, next) => {
  console.log("errorHandler")
  response.status(500).json({
    message: error.message,
    stack: error.stack
  })
}

module.exports = { logErrors, boomHandler, errorHandler }