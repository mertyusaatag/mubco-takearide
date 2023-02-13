const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength : 3
    },
    location: {
        type: String,
        required: true
    },
    age: { type: Number, required: true, min: 18 },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: { maxDepth:1 }
    }]
}, { timestamps: true, versionKey: false })

DriverSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Driver', DriverSchema);