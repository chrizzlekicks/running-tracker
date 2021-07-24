const express = require('express')
const router = express.Router()

const {
  getTracks,
  createTrack,
  getSingleTrack,
  deleteTrack,
  updateTrack,
} = require('../controllers/tracks')

router.route('/').get(getTracks).post(createTrack)
router.route('/:id').get(getSingleTrack).delete(deleteTrack).patch(updateTrack)

module.exports = router
