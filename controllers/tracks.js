const Track = require('../models/Track')
const asyncFn = require('../middleware/async')
const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getTracks = asyncFn(async (req, res) => {
  const tracks = await Track.find({})
  res.status(StatusCodes.OK).json({ tracks })
})

const createTrack = asyncFn(async (req, res) => {
  const track = await Track.create(req.body)
  res.status(StatusCodes.CREATED).json({ track })
})

const getSingleTrack = asyncFn(async (req, res, next) => {
  const track = await Track.findOne({ _id: req.params.id })
  if (!track) {
    throw new NotFoundError(
      `could not find the right track with the id of ${req.params.id}`
    )
  }
  res.status(StatusCodes.OK).json({ track })
})

const deleteTrack = asyncFn(async (req, res, next) => {
  const track = await Track.findOneAndDelete({ _id: req.params.id })
  if (!track) {
    throw new NotFoundError(
      `could not delete the right track with the id of ${req.params.id}`
    )
  }
  res.status(StatusCodes.OK).json({ track })
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
    throw new NotFoundError(
      `could not update the right track with the id of ${req.params.id}`
    )
  }
  res.status(StatusCodes.OK).json({ track })
})

module.exports = {
  getTracks,
  createTrack,
  getSingleTrack,
  deleteTrack,
  updateTrack,
}
