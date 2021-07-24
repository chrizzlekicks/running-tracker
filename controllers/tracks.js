const Track = require('../models/Track')
const asyncFn = require('../middleware/async')
const { createNewCustomError } = require('../errors/customErrors')

const getTracks = asyncFn(async (req, res) => {
  const tracks = await Track.find({})
  res.status(200).json({ tracks })
})

const createTrack = asyncFn(async (req, res) => {
  const track = await Track.create(req.body)
  res.status(201).json({ track })
})

const getSingleTrack = asyncFn(async (req, res, next) => {
  const track = await Track.findOne({ _id: req.params.id })
  if (!track) {
    return next(
      createNewCustomError(
        `could not find the right track with the id of ${req.params.id}`,
        404
      )
    )
  }
  res.status(200).json({ track })
})

const deleteTrack = asyncFn(async (req, res, next) => {
  const track = await Track.findOneAndDelete({ _id: req.params.id })
  if (!track) {
    return next(
      createNewCustomError(
        `could not delete the right track with the id of ${req.params.id}`,
        404
      )
    )
  }
  res.status(200).json({ track })
})

const updateTrack = asyncFn(async (req, res, next) => {
  const track = await Track.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!track) {
    return next(
      createNewCustomError(
        `could not update the right track with the id of ${req.params.id}`,
        404
      )
    )
  }
  res.status(200).json({ track })
})

module.exports = {
  getTracks,
  createTrack,
  getSingleTrack,
  deleteTrack,
  updateTrack,
}
