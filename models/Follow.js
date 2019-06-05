const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const followSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    vacation: {
        type: Schema.Types.ObjectId,
        ref: 'vacations'
    },
    vacationId: {
        type: String
    },
    followerEmail: {
        type: String
    }
});

module.exports = Follow = mongoose.model('followers', followSchema);