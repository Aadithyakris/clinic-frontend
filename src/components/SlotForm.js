
// import React, { useState } from 'react';
// import axios from 'axios';

// const SlotForm = () => {
//   const [date, setDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [numberOfSlots, setNumberOfSlots] = useState('');
//   const [message, setMessage] = useState('');
//   const [duplicateMessage, setDuplicateMessage] = useState('');

//   const formatTimeInput = (input) => {
//     const cleaned = input.trim().toUpperCase().replace(/\s+/g, '');
//     const timeMatch = cleaned.match(/^(\d{1,2})(\d{2})?(AM|PM)$/);

//     if (!timeMatch) return input;

//     let [_, hourStr, minuteStr, ampm] = timeMatch;
//     let hour = hourStr.padStart(2, '0');
//     let minute = minuteStr || '00';

//     return `${hour}:${minute} ${ampm}`;
//   };

//   const handleGenerateSlots = async () => {
//     const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;

//     if (!timeRegex.test(startTime)) {
//       setMessage('❌ Invalid start time. Use HH:MM AM/PM');
//       return;
//     }

//     if (!timeRegex.test(endTime)) {
//       setMessage('❌ Invalid end time. Use HH:MM AM/PM');
//       return;
//     }

//     try {
//       const response = await axios.post('https://clinic-bot-backend.onrender.com/api/slots/generate', {
//         date,
//         startTime,
//         endTime,
//         numberOfSlots: parseInt(numberOfSlots),
//       });

//       setMessage(`✅ ${response.data.created.length} slot(s) created successfully.`);
//       setDuplicateMessage(
//         response.data.duplicates.length > 0
//           ? `⚠️ Skipped ${response.data.duplicates.length} duplicate slot(s): ${response.data.duplicates.join(', ')}`
//           : ''
//       );

//       // Clear form
//       setDate('');
//       setStartTime('');
//       setEndTime('');
//       setNumberOfSlots('');
//     } catch (error) {
//       console.error('Error generating slots:', error);
//       setMessage('❌ Failed to generate slots');
//     }
//   };

//   return (
//     <div>
//       <h2>Generate Slots</h2>

//       <label>Date:</label><br />
//       <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br /><br />

//       <label>Start Time (e.g. 10:00 AM):</label><br />
//       <input
//         type="text"
//         value={startTime}
//         onChange={(e) => setStartTime(e.target.value)}
//         onBlur={() => setStartTime(formatTimeInput(startTime))}
//         placeholder="HH:MM AM/PM"
//       /><br /><br />

//       <label>End Time (e.g. 12:00 PM):</label><br />
//       <input
//         type="text"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//         onBlur={() => setEndTime(formatTimeInput(endTime))}
//         placeholder="HH:MM AM/PM"
//       /><br /><br />

//       <label>Number of Slots:</label><br />
//       <input
//         type="number"
//         value={numberOfSlots}
//         onChange={(e) => setNumberOfSlots(e.target.value)}
//       /><br /><br />

//       <button onClick={handleGenerateSlots}>Generate</button><br /><br />
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {duplicateMessage && <p style={{ color: 'orange' }}>{duplicateMessage}</p>}
//     </div>
//   );
// };

// export default SlotForm;


import React, { useState } from 'react';
import axios from 'axios';

const SlotForm = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberOfSlots, setNumberOfSlots] = useState('');
  const [message, setMessage] = useState('');
  const [duplicateMessage, setDuplicateMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatTimeInput = (input) => {
    const cleaned = input.trim().toUpperCase().replace(/\s+/g, '');
    const timeMatch = cleaned.match(/^(\d{1,2})(\d{2})?(AM|PM)$/);

    if (!timeMatch) return input;

    let [_, hourStr, minuteStr, ampm] = timeMatch;
    let hour = hourStr.padStart(2, '0');
    let minute = minuteStr || '00';

    return `${hour}:${minute} ${ampm}`;
  };

  const validateInputs = () => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    if (!date || !timeRegex.test(startTime) || !timeRegex.test(endTime) || !numberOfSlots) {
      setMessage('❌ Please fill all fields correctly.');
      return false;
    }
    return true;
  };

  const handleGenerateSlots = async () => {
    setShowModal(false);
    setLoading(true);
    setMessage('');
    setDuplicateMessage('');

    try {
      const response = await axios.post('https://clinic-bot-backend.onrender.com/api/slots/generate', {
        date,
        startTime,
        endTime,
        numberOfSlots: parseInt(numberOfSlots),
      });

      setMessage(`✅ ${response.data.created.length} slot(s) created successfully.`);
      if (response.data.duplicates?.length > 0) {
        setDuplicateMessage(`⚠️ Skipped ${response.data.duplicates.length} duplicate slot(s): ${response.data.duplicates.join(', ')}`);
      }

      // Reset form
      setDate('');
      setStartTime('');
      setEndTime('');
      setNumberOfSlots('');
    } catch (error) {
      console.error('Error generating slots:', error);
      setMessage('❌ Failed to generate slots');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🛠 Generate Appointment Slots</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Date:</label><br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Start Time (e.g. 10:00 AM):</label><br />
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          onBlur={() => setStartTime(formatTimeInput(startTime))}
          placeholder="HH:MM AM/PM"
          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>End Time (e.g. 12:00 PM):</label><br />
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          onBlur={() => setEndTime(formatTimeInput(endTime))}
          placeholder="HH:MM AM/PM"
          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Number of Slots:</label><br />
        <input
          type="number"
          value={numberOfSlots}
          onChange={(e) => setNumberOfSlots(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <button
        onClick={() => validateInputs() && setShowModal(true)}
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        ➕ Generate Slots
      </button>

      {loading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>⏳ Generating slots...</p>}
      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {duplicateMessage && <p style={{ color: 'orange', marginTop: '0.5rem' }}>{duplicateMessage}</p>}

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <h3>Confirm Slot Generation</h3>
            <p>Are you sure you want to generate <strong>{numberOfSlots}</strong> slots on <strong>{date}</strong>?</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ccc',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateSlots}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotForm;
