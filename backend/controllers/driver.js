const httpStatus = require('http-status');
const driverService = require('../service/driver-service');
const commentController = require('./comment');
const passengerController = require('./passenger');
const bookingController = require('./booking');

const getAll = async (req, res) => {
    res.send(await driverService.load());
};

const createDriver = async (req, res) => {
    try {
        const driver = await driverService.insert(req.body);
        res.send(driver);
    }
    catch (err) {
        res.send(err);
    }

};

const deleteDriver = async (req, res) => {
    try {
        await driverService.removeBy('_id', req, params.driverId);

        res.status(httpStatus[200]).send(httpStatus.OK);
    } catch (err) {
        res.send(err);
    }
};

const getDriverById = async (req, res) => {
    try {
        const driver = await driverService.find(req.params.driverId);
        if (!driver) return res.status(httpStatus.NOT_FOUND).send('Cannot find driver');

        res.send(driver);
    } catch (error) {
        res.send(err);
    }

}

const getYoungDrivers = async (req, res) => {
    try {
        const drivers = await driverService.findYoungDrivers();
        res.send(drivers);
    } catch (err) {
        res.send(err);
    }
};

const updateDriver = async (req, res) => {
    try {
        const { driverId } = req.params;
        const { name } = req.body;

        const updatedDriver = await driverService.update(driverId, { name });
        if (!updatedDriver) res.send("Driver was not found.")

        res.status(httpStatus.OK).send("Driver Updated")
    } catch (error) {
        res.send(err);
    }

}

const sendCommentForDriver = async (req, res) => {
    try {
        const { passengerId, driverId, content } = req.body;
        const comment = await commentController.addComment(driverId, passengerId, content);
        res.send(comment)
    }
    catch (err) {
        res.send(err)
    }
}

const getDriverComments = async (req, res) => {
    try {
        const driverId = req.params.driverId;
        const driver = await driverService.find(driverId);
        if (!driver) return res.status(httpStatus.NOT_FOUND).send('Cannot find driver');
        const comments = await commentController.getCommentByDriverId(driverId);

        const driverComment = await comments.map(async (comment) => {
            let commentObject = {
                driverName: driver.name,
                commentContent: comment.content,
                passenger: await passengerController.getPassengerNameById(comment.passenger),
            }
            return commentObject
        })

        Promise.all(driverComment)
            .then((resolvedComments) => {
                res.send(resolvedComments);
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        res.send(error)
    }

};


module.exports = {
    getAll,
    createDriver,
    deleteDriver,
    getDriverById,
    getYoungDrivers,
    updateDriver,
    getDriverComments,
    sendCommentForDriver
}