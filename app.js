require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

const db = require('./db/connect')
const authRouter = require('./routers/auth')
const trackRouter = require('./routers/tracks')
const notFound = require('./middleware/404')
const dbErrorHandler = require('./middleware/dbErrorHandler')
const authMiddleware = require('./middleware/authenticator')

// middleware
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tracks', authMiddleware, trackRouter)

// errors
app.use(notFound)
app.use(dbErrorHandler)

const port = process.env.PORT || 5000

// spin up the server
const server = async () => {
  try {
    await db(process.env.MONGODB_URI)
    app.listen(port, console.info(`server is running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

server()
