const CustomDBError = require('./customErrors')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomDBError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError
