const express = require('express');
const router = express.Router();
const { bookingController, resetSeatsController, getSeats } = require('../controller/seats.controller');

// Reset all seats
router.post('/reset', resetSeatsController);

// Get all seats
router.get('/', getSeats);

// Book seats
router.post('/book', bookingController);

module.exports = router;
