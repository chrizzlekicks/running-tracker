const mongoose = require('mongoose')
const User = require('./User')

const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Streckenname erforderlich'],
      maxLength: 50,
    },
    distance: {
      type: Number,
      trim: true,
      required: [true, 'Streckendistanz erforderlich'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'Gib eine Stadt an'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User fehlt'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Track', trackSchema)
