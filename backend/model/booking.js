const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Driver',
        required: true,
        autopopulate:{maxDepth:1}
    },
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Passenger',
        required: true,
        autopopulate: {maxDepth:1}
    },
    origin:String,
    destination:String
},{ timestamps: true, versionKey: false })

BookingSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Booking',BookingSchema);