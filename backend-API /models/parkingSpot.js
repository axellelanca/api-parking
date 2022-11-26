const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSlotSchema = new Schema({
    num: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: false
    },
    time: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Parking_slot', parkingSlotSchema);