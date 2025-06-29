// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css'; // We'll create this next

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">Doctor Panel</h2>
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <ul className={`nav-links ${open ? 'active' : ''}`}>
          <li><Link to="/admin" onClick={() => setOpen(false)}>Generate Slots</Link></li>
          <li><Link to="/admin/slots" onClick={() => setOpen(false)}>Available Slots</Link></li>
          <li><Link to="/admin/booked" onClick={() => setOpen(false)}>Booked Slots</Link></li>
          <li><Link to="/admin/qr" onClick={() => setOpen(false)}>QR Code</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
