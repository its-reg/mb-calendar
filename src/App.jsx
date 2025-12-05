import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [now, setNow] = useState(moment().tz(moment.tz.guess()));
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(moment().tz(moment.tz.guess()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleNextMonth = () => {
    setCurrentMonth((m) => m.clone().add(1, 'month'));
  };

  const handlePrevMonth = () => {
    setCurrentMonth((m) => m.clone().subtract(1, 'month'));
  };

  const images = [
    'https://64.media.tumblr.com/8d4efda80fbbd83074b93efeef9e10d0/368d26a041dfae8c-37/s1280x1920/a4a31a7985b50a3a374e182943060ac8291b8d4b.jpg',
    'https://64.media.tumblr.com/6d16b8827b28b99153e1b7c6cb5fb957/36cc8e5d86f378a1-db/s1280x1920/c93cc7f7e19dd616d8139503f7d7bf5f2630407e.jpg'
  ];

  const getImageForMonth = (m) => {
    if (!images || images.length === 0) return '';
    const monthIndex = m.month();
    return images[monthIndex % images.length];
  };

  // Build calendar days (6 rows x 7 cols = 42 cells)
  const startOfMonth = currentMonth.clone().startOf('month');
  const endOfMonth = currentMonth.clone().endOf('month');
  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const cells = [];
  // previous month's tail
  const prevMonth = currentMonth.clone().subtract(1, 'month');
  const daysInPrev = prevMonth.daysInMonth();

  for (let i = 0; i < startDay; i++) {
    const dayNum = daysInPrev - (startDay - 1 - i);
    cells.push({
      date: prevMonth.clone().date(dayNum),
      inMonth: false
    });
  }

  // current month
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ date: currentMonth.clone().date(d), inMonth: true });
  }

  // next month's lead to fill up to 42
  const nextMonth = currentMonth.clone().add(1, 'month');
  while (cells.length < 42) {
    const dayNum = cells.length - (startDay + totalDays) + 1;
    cells.push({ date: nextMonth.clone().date(dayNum), inMonth: false });
  }

  const weekdays = moment.weekdaysShort();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 16, maxWidth: 900 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0 }}>{currentMonth.format('MMMM YYYY')}</h1>
          <div style={{ fontSize: 12, color: '#555' }}>
            Current Time: {now.format('HH:mm:ss')} ({moment.tz.guess()})
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={handlePrevMonth} style={{ marginRight: 8 }}>Previous</button>
          <button onClick={handleNextMonth}>Next</button>
        </div>
      </header>

      <div style={{ marginTop: 12 }}>
        <img
          src={getImageForMonth(currentMonth)}
          alt="Monthly"
          style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 8 }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {weekdays.map((w) => (
            <div key={w} style={{ textAlign: 'center', fontWeight: 'bold' }}>{w}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginTop: 8 }}>
          {cells.map((c, idx) => {
            const isToday = c.date.isSame(moment(), 'day');
            const isSelected = selectedDate && c.date.isSame(selectedDate, 'day');
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(c.date.clone())}
                style={{
                  padding: 8,
                  minHeight: 60,
                  textAlign: 'left',
                  background: isSelected ? '#2b8fff' : isToday ? '#e6f7ff' : c.inMonth ? '#fff' : '#f6f6f6',
                  color: c.inMonth ? '#000' : '#888',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 12 }}>{c.date.date()}</div>
                {isSelected && <div style={{ fontSize: 11, marginTop: 6 }}>Selected</div>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div style={{ marginTop: 12, padding: 8, border: '1px solid #eee', borderRadius: 6 }}>
          <strong>Selected:</strong> {selectedDate.format('dddd, MMMM Do YYYY')}
        </div>
      )}
    </div>
  );
};

export default Calendar;
