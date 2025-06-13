const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableid: {type: Number, required: true, unique: true},
  windowed: {type: Boolean,required: true},
  inside: {type: Boolean,required: true},
  size: {type: String,enum: ['small', 'medium', 'large'], required: true},
  color: {type: String, enum: ['red', 'blue', 'green', 'yellow'], required: true, default: 'yellow'},
}, 
{timestamps: true});

module.exports = mongoose.model('Table', tableSchema);
