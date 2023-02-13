const express = require('express');
const bookingController = require('../controllers/booking');

const router = express.Router();

router.get('/',bookingController.getBookings);
router.get('/search',bookingController.search);


module.exports = router;