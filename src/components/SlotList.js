import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SlotList = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [date, setDate] = useState('');

  const fetchSlots = async () => {
    try {
      const res = await axios.get(`https://clinic-bot-backend.onrender.com/api/slots?date=${date}`);
      // Sort by time (24hr comparison)
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
    }
  };

  const handleCheckboxChange = (slotId) => {
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
    <div>
      <h2>Slots List</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={fetchSlots}>Fetch Slots</button>
      <ul>
        {slots.map((slot) => (
          <li
            key={slot.id}
            style={{
              backgroundColor: slot.isBooked ? '#ffd6d6' : '#d6ffd6',
              padding: '10px',
              marginBottom: '8px',
              borderRadius: '6px',
            }}
          >
            <input
              type="checkbox"
              checked={selectedSlots.includes(slot.id)}
              onChange={() => handleSelect(slot.id)}
              disabled={slot.isBooked}
              style={{ marginRight: '10px' }}
            />
            ⏰ {slot.time} | {slot.isBooked ? '🟥 Booked' : '🟩 Available'}
          </li>

        ))}
      </ul>
      <button onClick={handleDelete} disabled={selectedSlots.length === 0}>
        Delete Selected Slots
      </button>
    </div>
  );
};

export default SlotList;
