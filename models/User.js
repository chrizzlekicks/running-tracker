const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Username required'],
    minLength: 4,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Valid email required',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minLength: 6,
  },
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
    },
    'jwtSecret',
    { expiresIn: '30d' }
  )
}

UserSchema.methods.checkPassword = async function (input) {
  return bcrypt.compare(input, this.password)
}

module.exports = model('User', UserSchema)
