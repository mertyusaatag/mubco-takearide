const BaseService = require('./base-service')
const Passenger = require('../model/passenger')

class PassengerService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name)
  }

  async addPassenger(passenger) {
    let newPassenger = await this.insert(passenger);
    return newPassenger;
  }

}

module.exports = new PassengerService(Passenger)