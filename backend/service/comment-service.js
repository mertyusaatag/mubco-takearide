const BaseService = require('./base-service')
const DriverService = require('./driver-service')
const PassengerService = require('./passenger-service')
const Comment = require('../model/comment');
const bookingService = require('./booking-service');

class CommentService extends BaseService {
    async addComment(driverId, passengerId, content) {
        const driver = await DriverService.find(driverId);
        const passenger = await PassengerService.find(passengerId);
        const comment = await this.insert({ driver, passenger, content });
        driver.comments.push(comment);

        await driver.save();

        return comment;
    }
}

module.exports = new CommentService(Comment)