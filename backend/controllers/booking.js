const bookingService = require('../service/booking-service');

const getBookings = async (req, res) => {
    const bookings = await bookingService.load();

    res.send(bookings)
}

const getBooking = async (bookingId) => {
    const booking = await bookingService.find(bookingId);
    if(!booking) throw "There is no booking";
    return booking;
}

const search = async (req, res) => {
    const origin = req.query.origin;
    const destination = req.query.destination;

    const query = {};

    if (origin) query.origin = origin;
    if (destination) query.destination = destination;

    const bookings = await bookingService.query(query);

    res.send(bookings);
}

const book = async (driverId,passengerId,origin,destination) => {
    const booking = await bookingService.book(driverId,passengerId,origin,destination);
    return booking;

}

module.exports = {
    getBookings,
    search,
    book,
    getBooking
};

