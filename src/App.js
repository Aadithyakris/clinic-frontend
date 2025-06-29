import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import BookedSlotList from './components/BookedSlotList';
import QrCodePage from './components/QrCodePage';
import BookingForm from './components/BookingForm';

function App() {
  const linkStyle = {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    marginRight: '10px',
  };

  return (
    <Router>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>🩺 Doctor Admin Panel</h1>

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <a href="/" style={linkStyle}>Generate Slots</a>
          <a href="/slots" style={linkStyle}>View & Delete Slots</a>
          <a href="/booked" style={linkStyle}>Booked Slots</a>
          <a href="/qr" style={linkStyle}>QR Code</a>
        </nav>

        <Routes>
          <Route path="/" element={<SlotForm />} />
          <Route path="/slots" element={<SlotList />} />
          <Route path="/booked" element={<BookedSlotList />} />
          <Route path="/qr" element={<QrCodePage />} />
          <Route path="/book" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
