const express = require('express');
const router = express.Router();
const Trip = require('../models/tripModel');

const newTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    req.io.emit('newTrip', savedTrip);
    res.status(201).json({
      success: true,
      data: {
        savedTrip,
      },
    });
  } catch (error) {
    console.log('Error');
  }
};

const getAllTrip = async (req, res) => {
  const { status, sortBy } = req.query;
  let query = {};
  if (status) query.status = status;

  let sort = {};
  if (sortBy) sort[sortBy] = 1;

  try {
    const trips = await Trip.find(query).sort(sort);
    res.status(200).send(trips);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTrip = async (req, res) => {
  const { status } = req.body;
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    req.io.emit('statusChanged', updatedTrip);
    res.status(200).send(updatedTrip);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { newTrip, getAllTrip, updateTrip };
