import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import BookedSlotList from './components/BookedSlotList';
import QrCodePage from './components/QrCodePage';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isLoggedIn = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <div>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/qr" element={<QrCodePage />} />

          {/* Redirect root to login if not logged in */}
          <Route
            path="/"
            element={
              isLoggedIn ? <SlotForm /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/slots"
            element={
              isLoggedIn ? <SlotList /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/booked"
            element={
              isLoggedIn ? <BookedSlotList /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
