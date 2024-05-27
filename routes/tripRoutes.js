const express = require('express');
const router = express.Router();
const {
  newTrip,
  getAllTrip,
  updateTrip,
} = require('../controllers/tripController');

router.post(
  '/newtrip',
  (req, res, next) => {
    req.io = req.app.get('io');
    next();
  },
  newTrip
);

router.get('/getAllTrip', getAllTrip);

router.put(
  '/:id/status',
  (req, res, next) => {
    req.io = req.app.get('io'); // Attach io instance to req
    next();
  },
  updateTrip
);

module.exports = router;
