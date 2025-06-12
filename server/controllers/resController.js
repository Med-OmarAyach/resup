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
    if (guests > table.capacity) {
      return res.status(400).json({ message: "Number of guests exceeds table capacity" });
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
const getReservations = async (req, res) => {
  const userid = req.user._id;

  try {
    // Fetch reservations for the user
    const reservations = await Reservation.find({ userid })
      .populate('tableid', 'name capacity') // Populate table details
      

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { createReservation, getReservations}; //updateReservation, deleteReservation };