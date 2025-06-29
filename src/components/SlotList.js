// import React, { useState } from 'react';
// import axios from 'axios';

// const SlotList = () => {
//   const [slots, setSlots] = useState([]);
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [date, setDate] = useState('');
//   const [hasFetched, setHasFetched] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchSlots = async () => {
//     if (!date) return;

//     setIsLoading(true);
//     setHasFetched(false);
//     try {
//       const res = await axios.get(`https://clinic-bot-backend.onrender.com/api/slots?date=${date}`);
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
//       setSlots(sorted);
//     } catch (err) {
//       console.error('Error fetching slots:', err);
//     } finally {
//       setIsLoading(false);
//       setHasFetched(true);
//     }
//   };

//   const handleSelect = (slotId) => {
//     setSelectedSlots((prev) =>
//       prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
//     );
//   };

//   const handleDelete = async () => {
//     if (selectedSlots.length === 0) {
//       alert("No slots selected.");
//       return;
//     }

//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${selectedSlots.length} slot(s)?`
//     );
//     if (!confirmDelete) return;

//     try {
//       await Promise.all(
//         selectedSlots.map((id) =>
//           axios.delete(`https://clinic-bot-backend.onrender.com/api/slots/${id}`)
//         )
//       );
//       setSlots((prev) => prev.filter((slot) => !selectedSlots.includes(slot.id)));
//       setSelectedSlots([]);
//       alert("Selected slots deleted successfully.");
//     } catch (err) {
//       console.error("Error deleting slots:", err);
//       alert("Error deleting one or more slots.");
//     }
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Available Slots</h2>
//       <div style={{ marginBottom: '1rem' }}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           style={{ padding: '0.5rem', marginRight: '1rem' }}
//         />
//         <button onClick={fetchSlots}>Fetch Slots</button>
//       </div>

//       {isLoading && (
//         <p style={{ fontStyle: 'italic', color: 'gray' }}>⏳ Loading slots...</p>
//       )}

//       {!isLoading && hasFetched && slots.length === 0 && (
//         <p style={{ fontStyle: 'italic', color: 'gray' }}>No slots available for this date.</p>
//       )}

//       {!isLoading && slots.length > 0 && (
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//             gap: '1rem',
//           }}
//         >
//           {slots.map((slot) => (
//             <div
//               key={slot.id}
//               style={{
//                 backgroundColor: slot.isBooked ? '#ffd6d6' : '#d6ffd6',
//                 padding: '1rem',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//               }}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedSlots.includes(slot.id)}
//                 onChange={() => handleSelect(slot.id)}
//                 disabled={slot.isBooked}
//               />
//               <div>
//                 <p style={{ margin: 0 }}>⏰ {slot.time}</p>
//                 <small>{slot.isBooked ? '🟥 Booked' : '🟩 Available'}</small>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div style={{ marginTop: '1.5rem' }}>
//         <button
//           onClick={handleDelete}
//           disabled={selectedSlots.length === 0}
//           style={{
//             padding: '0.7rem 1.2rem',
//             backgroundColor: '#ff4d4d',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: selectedSlots.length === 0 ? 'not-allowed' : 'pointer',
//           }}
//         >
//           Delete Selected Slots
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SlotList;


import React, { useState } from 'react';
import axios from 'axios';

const SlotList = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [date, setDate] = useState('');
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSlots = async () => {
    if (!date) return;

    setIsLoading(true);
    setHasFetched(false);
    try {
      const res = await axios.get(`https://clinic-bot-backend.onrender.com/api/slots?date=${date}`);
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
      setSlots(sorted);
    } catch (err) {
      console.error('Error fetching slots:', err);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  const handleSelect = (slotId) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
    );
  };

  const handleDelete = async () => {
    if (selectedSlots.length === 0) {
      alert("No slots selected.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedSlots.length} slot(s)?`
    );
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedSlots.map((id) =>
          axios.delete(`https://clinic-bot-backend.onrender.com/api/slots/${id}`)
        )
      );
      setSlots((prev) => prev.filter((slot) => !selectedSlots.includes(slot.id)));
      setSelectedSlots([]);
      alert("Selected slots deleted successfully.");
    } catch (err) {
      console.error("Error deleting slots:", err);
      alert("Error deleting one or more slots.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🗓 Available Slots</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={fetchSlots} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Fetch Slots
        </button>
      </div>

      {isLoading && (
        <p style={{ textAlign: 'center', color: '#555' }}>⏳ Loading slots...</p>
      )}

      {!isLoading && hasFetched && slots.length === 0 && (
        <p style={{ textAlign: 'center', color: '#777' }}>No slots available for this date.</p>
      )}

      {!isLoading && slots.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Select</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Time</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id} style={{ backgroundColor: slot.isBooked ? '#ffe5e5' : '#e6ffe6' }}>
                <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={selectedSlots.includes(slot.id)}
                    onChange={() => handleSelect(slot.id)}
                    disabled={slot.isBooked}
                  />
                </td>
                <td style={{ textAlign: 'center', padding: '0.5rem' }}>{slot.time}</td>
                <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                  {slot.isBooked ? '🟥 Booked' : '🟩 Available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          onClick={handleDelete}
          disabled={selectedSlots.length === 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: selectedSlots.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Delete Selected Slots
        </button>
      </div>
    </div>
  );
};

export default SlotList;
