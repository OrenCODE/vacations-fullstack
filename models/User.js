const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const VacationFollowSchema = new Schema({
//     vacationId: {
//         type: Schema.Types.ObjectId,
//         ref: 'vacations'
//     }
// });

// Create Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    // vacationsFollowed: {
    //     type: [VacationFollowSchema],
    //     default: null
    // }

});

module.exports = User = mongoose.model('users', UserSchema);
