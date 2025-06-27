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
    if (selectedSlots.length === 0) return;
    try {
      await axios.post('https://clinic-bot-backend.onrender.com/api/slots/delete', {
        slotIds: selectedSlots,
      });
      alert('Slots deleted successfully');
      fetchSlots(); // refresh
      setSelectedSlots([]);
    } catch (err) {
      console.error('Error deleting slots:', err);
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <h2>Slots List</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={fetchSlots}>Fetch Slots</button>
      <ul>
        {slots.map((slot) => (
          <li key={slot.id}>
            <input
              type="checkbox"
              checked={selectedSlots.includes(slot.id)}
              onChange={() => handleCheckboxChange(slot.id)}
            />
            ⏰ {slot.time}
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
