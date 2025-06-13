import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/reservation');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>🍽️ Welcome to SmartReservation</h1>
      <p>Book your ideal table in just a few clicks.</p>
      <button onClick={handleStart} style={{ padding: '1rem 2rem', marginTop: '2rem' }}>
        Start Reservation
      </button>
    </div>
  );
}

export default WelcomePage;
