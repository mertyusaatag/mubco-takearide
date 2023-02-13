const httpStatus = require('http-status');
const passengerService = require('../service/passenger-service');
const bookingController = require('./booking');

const create = async (req, res) => {
    try {
        let response = await passengerService.addPassenger(req.body);
        res.status(httpStatus.CREATED).send(response);
    }
    catch (err) {
        res.send(err);
    }
}

const getAll = async (req, res) => {
    try {
        res.send(await passengerService.load());
    } catch (error) {
        res.send(error);
    }
}

const getById = async (req, res) => {
    try {
        const passenger = await passengerService.find(req.params.passengerId);

        if (!passenger) return res.status(httpStatus.NOT_FOUND);
        res.send(passenger);
    }
    catch (err) {
        res.status(httpStatus.NOT_FOUND).send("Passenger Not Found");
    }
}

const createBooking = async (req, res) => {
    try {
        const passengerId = req.params.passengerId;
        const { driverId, origin, destination } = req.body;
        const booking = await bookingController.book(driverId, passengerId, origin, destination);
        res.send(booking);
    }
    catch (err) {
        res.status(httpStatus.NOT_FOUND).send(err);
    }
}

const updatePassengerName = async (req, res) => {
    const { passengerId } = req.params;
    const { name } = req.body;

    await passengerService.update(passengerId, { name })
}

const getPassengerNameById = async (passengerId) => {
    const passenger = await passengerService.find(passengerId);
    return passenger.name;
}

const deletePassenger = async (req,res) => {
    try{
        const {passengerId} = req.params;
        await passengerService.removeBy("_id",passengerId);
        res.status(httpStatus[404]).send(httpStatus.OK)
    }
    catch(err) {
        res.send(err);
    }

}

module.exports = { create, getById, createBooking, updatePassengerName, getAll,getPassengerNameById,deletePassenger };