const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tableid: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  guests: { type: Number, required: true }, 
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });
module.exports = mongoose.model('Reservation', reservationSchema);