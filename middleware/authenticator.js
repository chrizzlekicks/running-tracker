const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authMiddleware = async (req, res, next) => {
  let auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer')) {
    throw new UnauthenticatedError('Token nicht gültig. Zugriff verweigert')
  }
  const token = auth.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    throw new UnauthenticatedError('Token ungültig, Fehler')
  }
}

module.exports = authMiddleware
