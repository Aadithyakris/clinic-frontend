// src/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import BookedSlotList from './components/BookedSlotList';
import QrCodePage from './components/QrCodePage';
import AdminLogin from './components/AdminLogin';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAdmin', 'true');
    setIsLoggedIn(true);
    navigate('/'); // redirect to main admin page
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div>Add commentMore actions
      <h1>Doctor Admin Panel</h1>
      <nav>
        <Link to="/admin">Generate Slots</Link> |{" "}
        <Link to="/admin/slots">Available Slots</Link> |{" "}
        <Link to="/admin/booked">Booked Slots</Link> |{" "}
        <Link to="/admin/qr">QR Code</Link>
      </nav>
      <hr />
      <button onClick={handleLogout}>Logout</button>

      <Routes>Add commentMore actions
        <Route path="/admin" element={<SlotForm />} />
        <Route path="/admin/slots" element={<SlotList />} />
        <Route path="/admin/booked" element={<BookedSlotList />} />
        <Route path="/admin/qr" element={<QrCodePage />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;