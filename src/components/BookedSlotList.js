// import React, { useState } from 'react';
// import axios from 'axios';

// const BookedSlots = () => {
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [date, setDate] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const fetchBookedSlots = async () => {
//     if (!date) {
//       alert("Please select a date first.");
//       return;
//     }

//     setIsLoading(true);
//     setHasFetched(false);
//     try {
//       const res = await axios.get(
//         `https://clinic-bot-backend.onrender.com/api/booked-slots?date=${date}`
//       );

//       const sorted = res.data.sort((a, b) => {
//         const toMinutes = (t) => {
//           const [time, ampm] = t.split(' ');
//           let [hr, min] = time.split(':').map(Number);
//           if (ampm === 'PM' && hr !== 12) hr += 12;
//           if (ampm === 'AM' && hr === 12) hr = 0;
//           return hr * 60 + min;
//         };
//         return toMinutes(a.time) - toMinutes(b.time);
//       });

//       setBookedSlots(sorted);
//       setMessage(sorted.length === 0 ? 'No booked slots for this date.' : '');
//     } catch (err) {
//       console.error('Error fetching booked slots', err);
//       setMessage('Error fetching booked slots');
//     } finally {
//       setIsLoading(false);
//       setHasFetched(true);
//     }
//   };

//   const filteredSlots = bookedSlots.filter((slot) =>
//     slot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     slot.contact.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div style={{ maxWidth: '650px', margin: '2rem auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📋 Booked Slots</h2>

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
//         />
//         <button
//           onClick={fetchBookedSlots}
//           style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
//         >
//           Fetch Booked Slots
//         </button>
//       </div>

//       {bookedSlots.length > 0 && (
//         <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
//           <input
//             type="text"
//             placeholder="Search by name or contact..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//         </div>
//       )}

//       {isLoading && (
//         <p style={{ textAlign: 'center', color: '#777' }}>⏳ Loading booked slots...</p>
//       )}

//       {!isLoading && hasFetched && filteredSlots.length === 0 && (
//         <p style={{ textAlign: 'center', color: '#777' }}>{message || 'No matching results.'}</p>
//       )}

//       {!isLoading && filteredSlots.length > 0 && (
//         <>
//           <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
//             Total Booked Slots: {filteredSlots.length}
//           </p>

//           <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#fff3e0' }}>
//                 <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Time</th>
//                 <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Patient</th>
//                 <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Contact</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSlots.map((slot) => (
//                 <tr key={slot.id} style={{ backgroundColor: '#fffaf2' }}>
//                   <td style={{ textAlign: 'center', padding: '0.5rem' }}><strong>{slot.time}</strong></td>
//                   <td style={{ textAlign: 'center', padding: '0.5rem' }}>{slot.name} (🎂 {slot.age})</td>
//                   <td style={{ textAlign: 'center', padding: '0.5rem' }}>{slot.contact}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookedSlots;


import React, { useState } from 'react';
import axios from 'axios';

const BookedSlots = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookedSlots = async () => {
    if (!date) {
      alert("Please select a date first.");
      return;
    }

    setIsLoading(true);
    setHasFetched(false);
    try {
      const res = await axios.get(
        `https://clinic-bot-backend.onrender.com/api/booked-slots?date=${date}`
      );

      const sorted = res.data.sort((a, b) => {
        const toMinutes = (t) => {
          const [time, ampm] = t.split(' ');
          let [hr, min] = time.split(':').map(Number);
          if (ampm === 'PM' && hr !== 12) hr += 12;
          if (ampm === 'AM' && hr === 12) hr = 0;
          return hr * 60 + min;
        };
        return toMinutes(a.time) - toMinutes(b.time);
      });

      setBookedSlots(sorted);
      setMessage(sorted.length === 0 ? 'No booked slots for this date.' : '');
    } catch (err) {
      console.error('Error fetching booked slots', err);
      setMessage('Error fetching booked slots');
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  const filteredSlots = bookedSlots.filter((slot) =>
    slot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    slot.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📋 Booked Slots</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={fetchBookedSlots}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Fetch Booked Slots
        </button>
      </div>

      {bookedSlots.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
      )}

      {isLoading && (
        <p style={{ textAlign: 'center', color: '#777' }}>⏳ Loading booked slots...</p>
      )}

      {!isLoading && hasFetched && filteredSlots.length === 0 && (
        <p style={{ textAlign: 'center', color: '#777' }}>{message || 'No matching results.'}</p>
      )}

      {!isLoading && filteredSlots.length > 0 && (
        <>
          <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Total Booked Slots: {filteredSlots.length}
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#fff3e0' }}>
                <th style={tableHeaderStyle}>Time</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Age</th>
                <th style={tableHeaderStyle}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredSlots.map((slot) => (
                <tr key={slot.id} style={{ backgroundColor: '#fffaf2' }}>
                  <td style={tableCellStyle}><strong>{slot.time}</strong></td>
                  <td style={tableCellStyle}>{slot.name}</td>
                  <td style={tableCellStyle}>{slot.age}</td>
                  <td style={tableCellStyle}>{slot.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

// Reusable styles
const tableHeaderStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #ccc',
  textAlign: 'center',
};

const tableCellStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #eee',
  textAlign: 'center',
};

export default BookedSlots;
