const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJwt()
  res.status(StatusCodes.CREATED).json({ token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('email or password missing')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('invalid email or password')
  }
  // compare password
  const doesPasswordMatch = user.checkPassword(password)
  if (!doesPasswordMatch) {
    throw new UnauthenticatedError('password does not match')
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ token })
}

module.exports = {
  register,
  login,
}
