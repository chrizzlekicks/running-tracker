require('dotenv').config()

// express
const express = require('express')
const app = express()

const db = require('./db/connect')
const trackRouter = require('./routers/tracks')
const notFound = require('./middleware/404')
const dbErrorHandler = require('./middleware/dbErrorHandler')

// middleware
app.use(express.json())

// routes
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
