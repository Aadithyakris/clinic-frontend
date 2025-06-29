import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import BookedSlotList from './components/BookedSlotList';
import QrCodePage from './components/QrCodePage';
import BookingForm from './components/BookingForm';
import AdminLogin from './components/AdminLogin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for login status on app load
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAdmin', 'true');
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/book" element={<BookingForm />} />
          <Route path="/qr" element={<QrCodePage />} />

          {/* Admin Login Route */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <AdminLogin onLogin={handleLogin} />}
          />

          {/* Protected Admin Routes */}
          <Route
            path="/"
            element={isLoggedIn ? <SlotForm /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/slots"
            element={isLoggedIn ? <SlotList /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/booked"
            element={isLoggedIn ? <BookedSlotList /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
