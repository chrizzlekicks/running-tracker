const CustomDBError = require('./customErrors')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends CustomDBError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

module.exports = NotFoundError
