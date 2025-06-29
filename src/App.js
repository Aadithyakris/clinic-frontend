import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import BookedSlotList from './components/BookedSlotList';
import QrCodePage from './components/QrCodePage';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <h1>Doctor Admin Panel</h1>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/qr" element={<QrCodePage />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <SlotForm />
            </ProtectedRoute>
          } />
          <Route path="/slots" element={
            <ProtectedRoute>
              <SlotList />
            </ProtectedRoute>
          } />
          <Route path="/booked" element={
            <ProtectedRoute>
              <BookedSlotList />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
