import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './TripList.css';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchTrips();
  }, [status, sortBy]);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/trips/getAllTrip`,
        {
          params: { status, sortBy },
        }
      );
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips', error);
    }
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API);
    socket.on('newTrip', (newTrip) => {
      setTrips((prevTrips) => [newTrip, ...prevTrips]);
    });
    socket.on('statusChanged', (updatedTrip) => {
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === updatedTrip._id ? updatedTrip : trip
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='trip-list-container'>
      <div className='filters'>
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value=''>All Statuses</option>
          <option value='Pending'>Pending</option>
          <option value='in-progress'>In Progress</option>
          <option value='completed'>Completed</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value=''>Sort By</option>
          <option value='sourceLocation'>Source Location</option>
          <option value='destinationLocation'>Destination Location</option>
          <option value='typeOfGoods'>Type of Goods</option>
        </select>
      </div>
      <table className='trip-table'>
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Type of Goods</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip._id}</td>
              <td>{trip.sourceLocation}</td>
              <td>{trip.destinationLocation}</td>
              <td>{trip.typeOfGoods}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripList;
