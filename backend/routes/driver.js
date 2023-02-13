const express = require('express');
const driverController = require('../controllers/driver');

const router = express.Router();

router.post('/',driverController.createDriver);
router.post('/comment',driverController.sendCommentForDriver);
router.get('/',driverController.getAll);
router.get('/young-drivers',driverController.getYoungDrivers);
router.get('/driver-comments/:driverId',driverController.getDriverComments);
router.get('/driver-profile/:driverId', driverController.getDriverById);
router.patch('/update-driver/:driverId',driverController.updateDriver);
router.delete('/delete-driver/:driverId',driverController.deleteDriver);


module.exports = router