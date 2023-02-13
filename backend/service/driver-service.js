const BaseService = require('./base-service')
const driver = require('../model/driver');

const FIND_PROPS = {
    NAME : 'name',
    LOCATION : 'location'
}

class DriverService extends BaseService {

    async getDriverComments(driverId) {
        driverInfos = await this.find(driverId);
        return driverInfos.comments;
    }

    async findByDriverName(name) {
        return this.findBy(FIND_PROPS.NAME, name)
    }

    async findByLocation(location) {
        return this.findBy(FIND_PROPS.LOCATION, location)
    }

    async findYoungDrivers() {
        return this.query({
            age: {
                $lt: 30,
                $gte: 18
            }
        })
    }

    async addNewDriver(driverData) {
        const driver = await this.insert(driverData);
        return driver;
    }
}

module.exports = new DriverService(driver)