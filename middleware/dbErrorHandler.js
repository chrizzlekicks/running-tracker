const { StatusCodes } = require('http-status-codes')

const dbErrorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went bananas, pls try again later'
  }
  // if (err instanceof CustomDBError) {
  //  return res.status(err.statusCode).json({ msg: err.message })
  // }
  return res
    .status(customError.statusCode)
    .json({msg: customError.message})
}

module.exports = dbErrorHandler
