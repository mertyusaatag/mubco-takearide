const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        autopopulate: { maxDepth: 1 }
    },
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger',
        autopopulate: { maxDepth: 1 }
    },
    content: String,
    date: Date,
}, { timestamps: true, versionKey: false })

CommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Comment', CommentSchema);
