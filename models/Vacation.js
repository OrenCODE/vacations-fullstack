const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VacationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    follower: {
        type: Schema.Types.ObjectId,
        ref: 'followers'
    },

    description: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    photoURL: {
        type: String
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    numOfFollowers: {
        type: Number,
        default: 0
    }
});

module.exports = Vacation = mongoose.model('vacations', VacationSchema);