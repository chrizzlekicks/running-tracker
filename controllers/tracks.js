const Track = require('../models/Track')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllTracks = async (req, res) => {
  const tracks = await Track.find({})
  res.status(StatusCodes.OK).json({ tracks })
}

const createTrack = async (req, res) => {
  const track = await Track.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ track })
}

const getTrack = async (req, res) => {
  const track = await Track.findOne({ _id: req.params.id })
  if (!track) {
    throw new NotFoundError(
      `could not find track with the id of ${req.params.id}`
    )
  }
  res.status(StatusCodes.OK).json({ track })
}

const updateTrack = async (req, res) => {
  const track = await Track.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!track) {
    throw new NotFoundError(
      `could not update track with the id of ${req.params.id}`
    )
  }
  res.status(StatusCodes.OK).json({ track })
}

const deleteTrack = async (req, res) => {
  const track = await Track.findOneAndDelete({ _id: req.params.id })
  if (!track) {
    throw new NotFoundError(
      `could not delete track with the id of ${req.params.id}`
    )
  }
  res.status(StatusCodes.OK).json({ track })
}

module.exports = {
  getAllTracks,
  createTrack,
  getTrack,
  updateTrack,
  deleteTrack,
}
