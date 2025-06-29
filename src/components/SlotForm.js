// import React, { useState } from 'react';
// import axios from 'axios';

// const SlotForm = () => {
//   const [date, setDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [numberOfSlots, setNumberOfSlots] = useState('');
//   const [message, setMessage] = useState('');

//   // Format input like "930am" -> "09:30 AM"
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
//       setMessage('❌ Invalid start time. Use format HH:MM AM/PM (e.g. 10:30 AM)');
//       return;
//     }

//     if (!timeRegex.test(endTime)) {
//       setMessage('❌ Invalid end time. Use format HH:MM AM/PM (e.g. 12:00 PM)');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://clinic-bot-backend.onrender.com/api/slots/generate',
//         {
//           date,
//           startTime,
//           endTime,
//           numberOfSlots: parseInt(numberOfSlots),
//         }
//       );

//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error generating slots:', error);
//       setMessage('❌ Failed to generate slots');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto', padding: '1rem' }}>
//       <h2>Generate Appointment Slots</h2>

//       <div style={{ marginBottom: '1rem' }}>
//         <label>Date:</label><br />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           style={{ width: '100%', padding: '0.5rem' }}
//         />
//       </div>

//       <div style={{ marginBottom: '1rem' }}>
//         <label>Start Time (e.g. 10:00 AM):</label><br />
//         <input
//           type="text"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//           onBlur={() => setStartTime(formatTimeInput(startTime))}
//           placeholder="HH:MM AM/PM"
//           style={{ width: '100%', padding: '0.5rem' }}
//         />
//       </div>

//       <div style={{ marginBottom: '1rem' }}>
//         <label>End Time (e.g. 12:00 PM):</label><br />
//         <input
//           type="text"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//           onBlur={() => setEndTime(formatTimeInput(endTime))}
//           placeholder="HH:MM AM/PM"
//           style={{ width: '100%', padding: '0.5rem' }}
//         />
//       </div>

//       <div style={{ marginBottom: '1rem' }}>
//         <label>Number of Slots:</label><br />
//         <input
//           type="number"
//           value={numberOfSlots}
//           onChange={(e) => setNumberOfSlots(e.target.value)}
//           min="1"
//           style={{ width: '100%', padding: '0.5rem' }}
//         />
//       </div>

//       <button
//         onClick={handleGenerateSlots}
//         style={{
//           padding: '0.7rem 1.5rem',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '6px',
//           cursor: 'pointer',
//           width: '100%',
//         }}
//       >
//         ➕ Generate Slots
//       </button>

//       {message && (
//         <p
//           style={{
//             marginTop: '1rem',
//             padding: '0.5rem',
//             backgroundColor: '#f5f5f5',
//             borderRadius: '6px',
//             color: message.includes('❌') ? 'red' : 'green',
//           }}
//         >
//           {message}
//         </p>
//       )}
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

  const formatTimeInput = (input) => {
    const cleaned = input.trim().toUpperCase().replace(/\s+/g, '');
    const timeMatch = cleaned.match(/^(\d{1,2})(\d{2})?(AM|PM)$/);

    if (!timeMatch) return input;

    let [_, hourStr, minuteStr, ampm] = timeMatch;
    let hour = hourStr.padStart(2, '0');
    let minute = minuteStr || '00';

    return `${hour}:${minute} ${ampm}`;
  };

  const handleGenerateSlots = async () => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;

    if (!timeRegex.test(startTime)) {
      setMessage('❌ Invalid start time. Use HH:MM AM/PM');
      return;
    }

    if (!timeRegex.test(endTime)) {
      setMessage('❌ Invalid end time. Use HH:MM AM/PM');
      return;
    }

    try {
      const response = await axios.post('https://clinic-bot-backend.onrender.com/api/slots/generate', {
        date,
        startTime,
        endTime,
        numberOfSlots: parseInt(numberOfSlots),
      });

      setMessage(`✅ ${response.data.created.length} slot(s) created successfully.`);
      setDuplicateMessage(
        response.data.duplicates.length > 0
          ? `⚠️ Skipped ${response.data.duplicates.length} duplicate slot(s): ${response.data.duplicates.join(', ')}`
          : ''
      );

      // Clear form
      setDate('');
      setStartTime('');
      setEndTime('');
      setNumberOfSlots('');
    } catch (error) {
      console.error('Error generating slots:', error);
      setMessage('❌ Failed to generate slots');
    }
  };

  return (
    <div>
      <h2>Generate Slots</h2>

      <label>Date:</label><br />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br /><br />

      <label>Start Time (e.g. 10:00 AM):</label><br />
      <input
        type="text"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        onBlur={() => setStartTime(formatTimeInput(startTime))}
        placeholder="HH:MM AM/PM"
      /><br /><br />

      <label>End Time (e.g. 12:00 PM):</label><br />
      <input
        type="text"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        onBlur={() => setEndTime(formatTimeInput(endTime))}
        placeholder="HH:MM AM/PM"
      /><br /><br />

      <label>Number of Slots:</label><br />
      <input
        type="number"
        value={numberOfSlots}
        onChange={(e) => setNumberOfSlots(e.target.value)}
      /><br /><br />

      <button onClick={handleGenerateSlots}>Generate</button><br /><br />
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {duplicateMessage && <p style={{ color: 'orange' }}>{duplicateMessage}</p>}
    </div>
  );
};

export default SlotForm;
