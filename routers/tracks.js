const express = require('express')
const router = express.Router()

const {
  getAllTracks,
  createTrack,
  getTrack,
  updateTrack,
  deleteTrack,
} = require('../controllers/tracks')

router.route('/').get(getAllTracks).post(createTrack)
router.route('/:id').get(getTrack).patch(updateTrack).delete(deleteTrack)

module.exports = router
