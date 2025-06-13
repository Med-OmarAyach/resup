const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  tableId: {type: mongoose.Schema.Types.ObjectId,ref: 'Table',required: true},
  startTime: {type: Date,required: true},
  durationMinutes: {type: Number,required: true,min: 15},
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: false},
  status: {
    type: String,enum: ['pending', 'confirmed', 'cancelled'],default: 'pending',required: true},
},
{
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
