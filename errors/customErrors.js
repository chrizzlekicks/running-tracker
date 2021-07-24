class CustomDBError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const createNewCustomError = (msg, statCode) => {
  return new CustomDBError(msg, statCode)
}

module.exports = { CustomDBError, createNewCustomError }
