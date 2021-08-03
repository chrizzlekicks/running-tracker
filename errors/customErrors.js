class CustomDBError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = CustomDBError
