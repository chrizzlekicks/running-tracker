const { CustomDBError } = require('../errors/customErrors')

const dbErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomDBError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(500)
    .json({ msg: `Something went bananas, pls try again later` })
}

module.exports = dbErrorHandler
