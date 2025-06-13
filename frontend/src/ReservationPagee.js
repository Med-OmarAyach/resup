import React, { useState } from 'react';

function ReservationPage() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [windowed, setWindowed] = useState(null);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    const reservationData = {
      size,
      inside: location === 'indoor',
      windowed: location === 'indoor' ? windowed : false,
    };

    console.log('✅ Final reservation data:', reservationData);

    const res = await fetch('http://localhost:5000/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData),
    });

    const result = await res.json();
    console.log('📬 Server response:', result);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', alignContent: 'center'}}>🪑 Make a Reservation</h2>

      {step === 1 && (
        <>
          <p style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>👉 What size table do you need?</p>
          <select value={size} onChange={(e) => setSize(e.target.value)}
            style={{ padding: '0.5rem', width: '100%' }}>
            <option value="">Choose...</option>
            <option value="small">Small (2 people)</option>
            <option value="medium">Medium (4 people)</option>
            <option value="large">Large (6+ people)</option>
          </select>
          <br /><br />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button  disabled={!size} onClick={handleNext} style={{ padding: '10px', marginleft: '32px',alignContent : 'center' }}>Next</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>👉 Do you prefer indoor or outdoor seating?</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button style={{margin : "10px"}}onClick={() => { setLocation('indoor'); handleNext(); }}>Indoor</button>
          <button  style={{margin : "10px"}} onClick={() => { setLocation('outdoor'); handleNext(); }}>Outdoor</button>
          </div>
          <br /><br />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={handleBack}>⬅ Back</button>
          </div>
        </>
      )}

      {step === 3 && location === 'indoor' && (
        <>
          <p>👉 Do you want a window seat?</p>
          <button onClick={() => { setWindowed(true); handleNext(); }}>Yes</button>
          <button onClick={() => { setWindowed(false); handleNext(); }}>No</button>
          <br /><br />
          <button onClick={handleBack}>⬅ Back</button>
        </>
      )}

      {step === 3 && location === 'outdoor' && (
        <>
          <p>✅ You selected: outdoor seating</p>
          <br />
          <button onClick={handleSubmit}>Confirm Reservation</button>
          <br /><br />
          <button onClick={handleBack}>⬅ Back</button>
        </>
      )}

      {step === 4 && (
        <>
          <p>✅ Reservation details:</p>
          <ul>
            <li>Size: {size}</li>
            <li>Location: {location}</li>
            <li>Window: {windowed ? 'Yes' : 'No'}</li>
          </ul>
          <button onClick={handleSubmit}>Confirm Reservation</button>
          <br /><br />
          <button onClick={handleBack}>⬅ Back</button>
        </>
      )}
    </div>
  );
}

export default ReservationPage;
