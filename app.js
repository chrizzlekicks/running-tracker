require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

// express
const express = require('express')
const app = express()

const db = require('./db/connect')
const userRouter = require('./routers/user')
const trackRouter = require('./routers/tracks')
const notFound = require('./middleware/404')
const dbErrorHandler = require('./middleware/dbErrorHandler')

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())

// routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/tracks', trackRouter)

// errors
app.use(notFound)
app.use(dbErrorHandler)

const port = process.env.PORT || 5000

// spin up the server
const server = async () => {
  try {
    await db(process.env.MONGODB_URI)
    app.listen(port, console.info(`Server running on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

server()
