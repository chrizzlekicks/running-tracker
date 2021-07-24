const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  distance: {
    type: Number,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Track', TrackSchema)
