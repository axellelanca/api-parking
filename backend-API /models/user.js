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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    spot: {
        //type: Schema.Types.ObjectId,
        type: String,
        // ref: 'Parking_slot',
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);