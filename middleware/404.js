const { StatusCodes } = require('http-status-codes')

const notFound = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send(`the route you are looking for was not found`)
}

module.exports = notFound
