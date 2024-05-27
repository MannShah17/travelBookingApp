const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    sourceLocation: {
      type: String,
      required: true,
    },
    destinationLocation: {
      type: String,
      required: true,
    },
    typeOfGoods: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
