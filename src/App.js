// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import AdminPanel from './AdminPanel';

function App() {
    return (
    <Router>
      <Routes>
        
        <Route path="/" element={<SlotForm />} />
        <Route path="/slots" element={<SlotList />} />
        <Route path="/booked" element={<BookedSlotList />} />
        <Route path="/qr" element={<QrCodePage />} />
        
        {/* Patient Booking Page */}
        <Route path="/book" element={<BookingForm />} />
        {/* Admin Panel Routes */}
        <Route path="/*" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
