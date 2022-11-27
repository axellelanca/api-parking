const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        //type: Schema.Types.ObjectId,
        type: String,
        ref: 'Role',
        type: String
    },
    password: {
        type: String,
        required: true
    },
    spot: {
        type: Schema.Types.ObjectId,
        ref: 'Parking_slot',
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);