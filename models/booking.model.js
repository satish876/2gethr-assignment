const mongoose = require("mongoose")
const validator = require("validator")

const RoomModel = require("./room.models")

const bookingSchema = new mongoose.Schema({
    dateToBook: {
        type: Date,
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room",
        validate: {
            async validator(id) {
                const room = await RoomModel.findById(id)
                if (!room) throw new Error(":Invalid room id")
            }
        }
    },
    reservations: [{
        slotNumber: {
            type: Number,
            require: true
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        }
    }]
}, {
        timestamps: true
    })

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking;