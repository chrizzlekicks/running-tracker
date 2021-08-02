const CustomDBError = require('./customErrors')
const { StatusCodes } = require('http-status-codes')

class UnauthenticatedError extends CustomDBError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedError
