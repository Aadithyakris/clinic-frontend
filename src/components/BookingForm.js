// import React, { useState } from 'react';
// import axios from 'axios';

// const BookingForm = () => {
//   const [date, setDate] = useState('');
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlotId, setSelectedSlotId] = useState('');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [contact, setContact] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [booking, setBooking] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false);

//   const fetchSlots = async () => {
//     if (!date) return;
//     setLoading(true);
//     setAvailableSlots([]);
//     setSelectedSlotId('');
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
//       setAvailableSlots(sorted);
//     } catch (err) {
//       console.error('Error fetching slots:', err);
//     } finally {
//       setLoading(false);
//       setHasFetched(true);
//     }
//   };

//   const handleBook = async () => {
//     if (!selectedSlotId || !name || !age || !contact) {
//       setMessage('❌ Please fill all the fields.');
//       return;
//     }

//     setBooking(true);
//     try {
//       const res = await axios.post('https://clinic-bot-backend.onrender.com/api/book', {
//         slotId: selectedSlotId,
//         name,
//         age,
//         contact,
//       });

//       setMessage(res.data.message || '✅ Appointment booked!');
//       // Clear form
//       setName('');
//       setAge('');
//       setContact('');
//       setSelectedSlotId('');
//     } catch (err) {
//       console.error('Booking error:', err);
//       setMessage('❌ Failed to book appointment.');
//     } finally {
//       setBooking(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
//       <h2 style={{ textAlign: 'center' }}>Book an Appointment</h2>

//       <label style={{ display: 'block', marginBottom: '0.3rem' }}>Select Date:</label>
//       <input
//         type="date"
//         min={new Date().toISOString().split('T')[0]}
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
//       />
//       <button
//         onClick={fetchSlots}
//         style={{
//           padding: '0.6rem 1.2rem',
//           marginBottom: '1.5rem',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '6px',
//           cursor: 'pointer',
//         }}
//       >
//         {loading ? 'Fetching...' : 'Check Slots'}
//       </button>

//       {hasFetched && availableSlots.length === 0 && (
//         <p style={{ color: 'gray', fontStyle: 'italic' }}>No available slots for selected date.</p>
//       )}

//       {availableSlots.length > 0 && (
//         <>
//           <label style={{ display: 'block', marginBottom: '0.3rem' }}>Select Time Slot:</label>
//           <select
//             onChange={(e) => setSelectedSlotId(e.target.value)}
//             value={selectedSlotId}
//             style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
//           >
//             <option value="">-- Select a time --</option>
//             {availableSlots.map((slot) => (
//               <option key={slot.id} value={slot.id}>{slot.time}</option>
//             ))}
//           </select>

//           <label>Name:</label><br />
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
//           />

//           <label>Age:</label><br />
//           <input
//             type="number"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
//           />

//           <label>Contact Number:</label><br />
//           <input
//             type="text"
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
//             style={{ padding: '0.5rem', marginBottom: '1.5rem', width: '100%' }}
//           />

//           <button
//             onClick={handleBook}
//             style={{
//               padding: '0.7rem 1.4rem',
//               backgroundColor: '#28a745',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               width: '100%',
//             }}
//             disabled={booking}
//           >
//             {booking ? 'Booking...' : 'Book Appointment'}
//           </button>
//         </>
//       )}

//       {message && (
//         <p style={{
//           marginTop: '1rem',
//           backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
//           color: message.includes('✅') ? '#155724' : '#721c24',
//           padding: '0.75rem',
//           borderRadius: '6px',
//         }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default BookingForm;


import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal toggle

  const fetchSlots = async () => {
    if (!date) return;
    setLoading(true);
    setAvailableSlots([]);
    setSelectedSlotId('');
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
      setAvailableSlots(sorted);
    } catch (err) {
      console.error('Error fetching slots:', err);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const handleBook = async () => {
    if (!selectedSlotId || !name || !age || !contact) {
      setMessage('❌ Please fill all the fields.');
      return;
    }

    setBooking(true);
    try {
      const res = await axios.post('https://clinic-bot-backend.onrender.com/api/book', {
        slotId: selectedSlotId,
        name,
        age,
        contact,
      });

      setMessage(res.data.message || '✅ Appointment booked!');
      setShowModal(true); // Show confirmation modal

      // Clear form
      setName('');
      setAge('');
      setContact('');
      setSelectedSlotId('');
    } catch (err) {
      console.error('Booking error:', err);
      setMessage('❌ Failed to book appointment.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Book an Appointment</h2>

      <label style={{ display: 'block', marginBottom: '0.3rem' }}>Select Date:</label>
      <input
        type="date"
        min={new Date().toISOString().split('T')[0]}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
      />
      <button
        onClick={fetchSlots}
        style={{
          padding: '0.6rem 1.2rem',
          marginBottom: '1.5rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Fetching...' : 'Check Slots'}
      </button>

      {hasFetched && availableSlots.length === 0 && (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>No available slots for selected date.</p>
      )}

      {availableSlots.length > 0 && (
        <>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Select Time Slot:</label>
          <select
            onChange={(e) => setSelectedSlotId(e.target.value)}
            value={selectedSlotId}
            style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
          >
            <option value="">-- Select a time --</option>
            {availableSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>{slot.time}</option>
            ))}
          </select>

          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
          />

          <label>Age:</label><br />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
          />

          <label>Contact Number:</label><br />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{ padding: '0.5rem', marginBottom: '1.5rem', width: '100%' }}
          />

          <button
            onClick={handleBook}
            style={{
              padding: '0.7rem 1.4rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
            }}
            disabled={booking}
          >
            {booking ? 'Booking...' : 'Book Appointment'}
          </button>
        </>
      )}

      {message && !showModal && (
        <p style={{
          marginTop: '1rem',
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          padding: '0.75rem',
          borderRadius: '6px',
        }}>
          {message}
        </p>
      )}

      {/* ✅ Modal Popup */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
          }}>
            <h3>✅ Appointment Confirmed</h3>
            <p>Your appointment has been successfully booked.</p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: '1rem',
                padding: '0.6rem 1.2rem',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
