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
    <div style={{ padding: '1rem' }}>
      <h2>Available Slots</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button onClick={fetchSlots}>Fetch Slots</button>
      </div>

      {isLoading && (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>⏳ Loading slots...</p>
      )}

      {!isLoading && hasFetched && slots.length === 0 && (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>No slots available for this date.</p>
      )}

      {!isLoading && slots.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {slots.map((slot) => (
            <div
              key={slot.id}
              style={{
                backgroundColor: slot.isBooked ? '#ffd6d6' : '#d6ffd6',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <input
                type="checkbox"
                checked={selectedSlots.includes(slot.id)}
                onChange={() => handleSelect(slot.id)}
                disabled={slot.isBooked}
              />
              <div>
                <p style={{ margin: 0 }}>⏰ {slot.time}</p>
                <small>{slot.isBooked ? '🟥 Booked' : '🟩 Available'}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <button
          onClick={handleDelete}
          disabled={selectedSlots.length === 0}
          style={{
            padding: '0.7rem 1.2rem',
            backgroundColor: '#ff4d4d',
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
