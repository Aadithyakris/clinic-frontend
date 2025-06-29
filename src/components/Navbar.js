// src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>👨‍⚕️ Admin Panel</h2>
      <div style={styles.links}>
        <Link to="/admin" style={styles.link}>Generate Slots</Link>
        <Link to="/admin/slots" style={styles.link}>Available Slots</Link>
        <Link to="/admin/booked" style={styles.link}>Booked Slots</Link>
        <Link to="/admin/qr" style={styles.link}>QR Code</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Navbar;
