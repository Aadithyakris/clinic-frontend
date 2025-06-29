// src/AdminPanel.js
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import BookedSlotList from './components/BookedSlotList';
import QrCodePage from './components/QrCodePage';
import AdminLogin from './components/AdminLogin';
import Navbar from './components/Navbar'; 


  function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }
    return (
    <div>
      <h1>Doctor Admin Panel</h1>
      <Navbar />

      <Routes>
        <Route path="/admin" element={<SlotForm />} />
        <Route path="/admin/slots" element={<SlotList />} />
        <Route path="/admin/booked" element={<BookedSlotList />} />
        <Route path="/admin/qr" element={<QrCodePage />} />
      </Routes>
    </div>
  );
}

export default AdminPanel;