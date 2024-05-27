import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './TripForm.css';

const TripForm = () => {
  const [sourceLocation, setSource] = useState('');
  const [destinationLocation, setDestination] = useState('');
  const [typeOfGoods, setTypeOfGoods] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/trips/newtrip`,
        {
          sourceLocation,
          destinationLocation,
          typeOfGoods,
        }
      );
      if (response.data.success) {
        toast.success('Trip Fetched Successfully');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.error(
        'Error booking trip',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Source'
        value={sourceLocation}
        onChange={(e) => setSource(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='Destination'
        value={destinationLocation}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='Type of Goods'
        value={typeOfGoods}
        onChange={(e) => setTypeOfGoods(e.target.value)}
        required
      />
      <button type='submit'>Book Trip</button>
    </form>
  );
};

export default TripForm;
