const { StatusCodes } = require('http-status-codes')
const CustomDBError = require('../errors/customErrors')

const dbErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomDBError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: `Something went bananas, pls try again later` })
}

module.exports = dbErrorHandler
