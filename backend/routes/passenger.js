const express = require('express');
const passengerController = require('../controllers/passenger')

const router = express.Router();

router.post('/', passengerController.create)
router.get('/:passengerId', passengerController.getById)
router.get('/', passengerController.getAll)
router.post('/book/:passengerId', passengerController.createBooking);
router.delete('/delete-passenger/:passengerId', passengerController.deletePassenger)

module.exports = router;