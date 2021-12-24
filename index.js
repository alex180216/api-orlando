const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const { logErrors, errorHandler, boomHandler } = require("./middlewares/error.handler")
const app = express()

const productsRouter = require("./routes/products.router")

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use("/products", productsRouter)

app.get("/api", (request, response) => {
  response.json({
    greeting: "hello"
  })
})

app.use(logErrors)
app.use(boomHandler)
app.use(errorHandler)

app.listen(PORT, (error) => {
  if (error)
    console.log(error)
  else
    console.log(`Server is running on port ${PORT}`)
})