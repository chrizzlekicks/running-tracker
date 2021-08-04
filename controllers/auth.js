const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createToken()
  res.status(StatusCodes.CREATED).json({ token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('keine email oder passwort eingegeben')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('ungültige zugangsaten')
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('passwort stimmmt nicht')
  }
  const token = user.createToken()
  res.status(StatusCodes.OK).json({ token })
}

module.exports = {
  register,
  login,
}
