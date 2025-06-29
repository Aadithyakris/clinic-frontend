// // src/components/AdminLogin.js
// import { useState } from 'react';

// const AdminLogin = ({ onLogin }) => {
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Change this to your desired admin password
//     if (password === 'doctor123') {
//       onLogin();
//     } else {
//       setError('Incorrect password');
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           placeholder="Enter admin password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <label>
//           <input
//             type="checkbox"
//             checked={showPassword}
//             onChange={() => setShowPassword((prev) => !prev)}
//           />
//           Show password
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default AdminLogin;


// src/components/AdminLogin.js
import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'doctor123') {
      onLogin();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Admin Login</h2>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              style={{ marginRight: '0.5rem' }}
            />
            Show password
          </label>
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '0.6rem',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
