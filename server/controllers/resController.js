const Reservation= require('../models/Reservation');
const User = require('../models/User');
const Table = require('../models/Table');
const createReservation = async (req, res) => {
  const { tableid, startDate, endDate, guests } = req.body;
  const userid = req.user._id;

  try {
    // 1. Check if the table exists
    const table = await Table.findById(tableid);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // 2. Check for overlapping reservation
    const overlapping = await Reservation.findOne({
      tableid: tableid,
      startDate: { $lt: endDate },
      endDate: { $gt: startDate }
    });

    if (overlapping) {
      return res.status(400).json({ message: "Table already reserved for that time" });
    }

    // 3. Create the reservation
    const newReservation = new Reservation({
      userid,
      tableid,
      startDate,
      endDate,
      guests
    });

    await newReservation.save();
    res.status(201).json({ message: "Reservation created", reservation: newReservation });

  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { createReservation };