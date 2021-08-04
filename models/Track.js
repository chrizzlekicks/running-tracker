const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
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
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Track', trackSchema)
