const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength : 3
    },
    location: {
        type: String,
        required:true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        autopopulate: { maxDepth: 2 }
    }]
},{ timestamps: true, versionKey: false })

PassengerSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Passenger', PassengerSchema)