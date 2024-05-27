import React from 'react';
import TripForm from './TripForm';
import TripList from './TripList';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Trip Booking Application</h1>
      <TripForm />
      <TripList />
    </div>
  );
}

export default App;
