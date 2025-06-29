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

//       // Sort by time (24hr conversion)
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

//   // Filter based on name/contact
//   const filteredSlots = bookedSlots.filter((slot) =>
//     slot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     slot.contact.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Booked Slots</h2>

//       <div style={{ marginBottom: '1rem' }}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           style={{ padding: '0.5rem', marginRight: '1rem' }}
//         />
//         <button onClick={fetchBookedSlots}>Fetch Booked Slots</button>
//       </div>

//       {bookedSlots.length > 0 && (
//         <input
//           type="text"
//           placeholder="Search by name or contact..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: '0.5rem',
//             width: '100%',
//             maxWidth: '300px',
//             marginBottom: '1rem',
//             borderRadius: '4px',
//             border: '1px solid #ccc',
//           }}
//         />
//       )}

//       {isLoading && (
//         <p style={{ fontStyle: 'italic', color: 'gray' }}>⏳ Loading booked slots...</p>
//       )}

//       {!isLoading && hasFetched && filteredSlots.length === 0 && (
//         <p style={{ fontStyle: 'italic', color: 'gray' }}>{message || 'No matching results.'}</p>
//       )}

//       {!isLoading && filteredSlots.length > 0 && (
//         <>
//           <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
//             Total Booked Slots: {filteredSlots.length}
//           </p>

//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//               gap: '1rem',
//               marginTop: '1rem',
//             }}
//           >
//             {filteredSlots.map((slot) => (
//               <div
//                 key={slot.id}
//                 style={{
//                   backgroundColor: '#ffe6cc',
//                   padding: '1rem',
//                   borderRadius: '8px',
//                   boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//                 }}
//               >
//                 <p style={{ margin: 0 }}>⏰ <strong>{slot.time}</strong></p>
//                 <p style={{ margin: '0.2rem 0' }}>
//                   👤 {slot.name} (🎂 {slot.age})
//                 </p>
//                 <p style={{ margin: 0 }}>📞 {slot.contact}</p>
//               </div>
//             ))}
//           </div>
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

      // Sort by time (24hr conversion)
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

  // Filter based on name/contact
  const filteredSlots = bookedSlots.filter((slot) =>
    slot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    slot.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Booked Slots</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button onClick={fetchBookedSlots}>Fetch Booked Slots</button>
      </div>

      {bookedSlots.length > 0 && (
        <input
          type="text"
          placeholder="Search by name or contact..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '100%',
            maxWidth: '300px',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      )}

      {isLoading && (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>⏳ Loading booked slots...</p>
      )}

      {!isLoading && hasFetched && filteredSlots.length === 0 && (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>{message || 'No matching results.'}</p>
      )}

      {!isLoading && filteredSlots.length > 0 && (
        <>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Total Booked Slots: {filteredSlots.length}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            {filteredSlots.map((slot) => (
              <div
                key={slot.id}
                style={{
                  backgroundColor: '#ffe6cc',
                  padding: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <p style={{ margin: 0 }}>⏰ <strong>{slot.time}</strong></p>
                <p style={{ margin: '0.2rem 0' }}>
                  👤 {slot.name} (🎂 {slot.age})
                </p>
                <p style={{ margin: 0 }}>📞 {slot.contact}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookedSlots;
