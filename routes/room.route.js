const express = require('express');
const moment = require("moment")

const router = express.Router();
const RoomModel = require("../models/room.models")
const BookingModel = require("../models/booking.model")

/* POST adds a new room. */
router.post('/addRoom', async (req, res) => {
  console.log("add room called");
  try {
    const newRoom = await RoomModel({ ...req.body })
    console.log(newRoom);
    if (!newRoom) throw new Error()

    await newRoom.save()
    console.log('saved');
    res.send(newRoom)
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
});

/* POST to book a room. */
router.post('/bookRoom', async (req, res) => {
  console.log("book room called");
  try {
    if (!req.body.slotsRequired) return res.status(400).send("slots missing")
    if (!req.body.dateToBook) return res.status(400).send("dateToBook missing")
    if (!req.body.roomId) return res.status(400).send("roomId missing")

    if(typeof req.body.dateToBook === "string") {
      //converting dateToBook to date object
      req.body.dateToBook = moment(req.body.dateToBook, "DD-MM-YYYY").format()
    }

    const slots = req.body.slotsRequired.map(slot => {
      return {
        slotNumber: slot,
        userName: req.body.userName
      }
    })


    const reservation = await BookingModel.findOne({ "roomId": req.body.roomId })

    if (!reservation) {
      //if no earlier bookings
      const newReservation = await BookingModel({
        "dateToBook": req.body.dateToBook,
        "roomId": req.body.roomId,
        reservations: slots
      })

      if (!newReservation) throw new Error()

      await newReservation.save()
      return res.send(newReservation)
    } else {
      const bookedSlots = reservation.reservations.map(i => i.slotNumber)
      const overlappingSlots = req.body.slotsRequired.filter(i => bookedSlots.indexOf(i) !== -1)

      if (overlappingSlots.length != 0) throw new Error(`slots "${overlappingSlots.toString()}" are already booked`)  
      
      reservation.reservations = [...reservation.reservations, ...slots]

      await reservation.save()
      res.send(reservation)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.toString())
  }
});


//-------
router.get("/", async (req, res) => {
  try {
    console.log("fetch all rooms");
    const rooms = await RoomModel.find({})
    console.log(rooms);
    res.send(rooms)
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
