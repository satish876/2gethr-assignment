const mongoose = require("mongoose")
const validator = require("validator")

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    numberOfSeats: {
        type: Number,
        required: true,
        min:0,
    },
    floorNumber: {
        type: String,
        required: true,
        trim: true
    },
    whiteboard: {
        type: Boolean,
        required: true
    },
    roomPic: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator(url) {
                if(!validator.isURL(url)) throw new Error("Invalid roomPic URL")
            }
        }
    },
    conference_cost_in_credits: {
        type:  Number,
        required: true
    }
}, {
        timestamps: true
    })

const Room = mongoose.model("Room", roomSchema)

module.exports = Room;