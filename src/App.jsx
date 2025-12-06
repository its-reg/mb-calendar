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

  const handleToday = () => {
    setCurrentMonth(moment());
  };

  const images = [
    {
      url: 'https://64.media.tumblr.com/8d4efda80fbbd83074b93efeef9e10d0/368d26a041dfae8c-37/s1280x1920/a4a31a7985b50a3a374e182943060ac8291b8d4b.jpg',
      caption: 'Artist: Reg @iamregressing'
    },
    {
      url: 'https://64.media.tumblr.com/47c5e05175c3f57543f479aed18e991b/36c11bb2fbfa636b-9e/s1280x1920/329768f33e08d67207eb38fa2d7187f4c4f4afe7.jpg',
      caption: 'Artist: Reg @iamregressing'
    },
    {
      url: 'https://64.media.tumblr.com/6d16b8827b28b99153e1b7c6cb5fb957/36cc8e5d86f378a1-db/s1280x1920/c93cc7f7e19dd616d8139503f7d7bf5f2630407e.jpg',
      caption: 'Artist: Reg @iamregressing'
    },
    {
      url: 'https://64.media.tumblr.com/43ae715c2a5f481490d7dbcca2e2e301/d85bb0e3517d1ae7-72/s1280x1920/b2251b99bb5890e2b98a43d7d601585eee8bb0c2.pnj',
      caption: 'Artist: Reg @iamregressing'
    },
    {
      url: 'https://64.media.tumblr.com/09d420f2004bce113db52f963b9b9354/672b16f6f31a2923-47/s540x810/609eada5e5a67e95b9e40963d9ed8bf1be1fd93f.jpg',
      caption: 'Artist: Reyna @chaiatelier'
    },
    {
      url: 'https://64.media.tumblr.com/05d14b5bacf474f13a14e8fa0d274da2/672b16f6f31a2923-db/s400x600/7a455b611c6288f3ec32a4e129f2cc5e84806d51.jpg',
      caption: 'Artist: Otosy @auroratellsstories'
    },
    {
      url: 'https://64.media.tumblr.com/1d858bda90d07a255f41b0e86fcfb6cd/672b16f6f31a2923-aa/s540x810/11e22e096f436cab437468098f172a252ed07ee6.pnj',
      caption: 'Artist: Reg @iamregressing'
    },
    {
      url: 'https://64.media.tumblr.com/561290a1db0e2ba8dab3aac6701b4dde/bf939ed463abc69a-e8/s1280x1920/318f27b0d94f9f810f06e5638b4bf76c81e9ff4a.jpg',
      caption: 'Artist: Pique @piquanteye'
    },
    {
      url: 'https://64.media.tumblr.com/90c42cecc2e86238df14335ec8ba3c06/672b16f6f31a2923-11/s400x600/791204a4ba417e5f3ebb51d26a479b5dfedec421.jpg',
      caption: 'Artist: Otosy @auroratellsstories'
    },
    {
      url: 'https://64.media.tumblr.com/5b6a9c17fe14c8f7cb3ef268dda155ca/e5cd16bf8a456b41-c8/s1280x1920/830d10e658791b710bb7b8e1ceb40efa669457c8.jpg',
      caption: 'Artist: Reg @iamregressing'
    },
    {
      url: 'https://64.media.tumblr.com/e1bcb182885af5cd39b8fb248e678d92/3173e5b1fd90d5ed-aa/s1280x1920/aab9ee0ec1969f5046104956f80c2b0830fdf9ca.jpg',
      caption: 'Artist: Reg @iamregressing'
    }
  ];

  const getImageForMonth = (m) => {
    if (!images || images.length === 0) return { url: '', caption: '' };
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
    <div>
      <style>{`
        .calendar-root { font-family: Arial, sans-serif; padding: 16px; max-width: 600px; display: grid; grid-template-columns: 1fr 300px; gap: 16px; }
        .calendar-top { grid-column: 1 / -1; margin-bottom: 8px; }
        .calendar-left { }
        .calendar-right { }
        @media (max-width: 767px) {
          .calendar-root { grid-template-columns: 1fr; max-width: 100%; }
        }
      `}</style>

      <div className="calendar-root">
        <div className="calendar-top">
          <header style={{ marginBottom: 8 }}>
            <h1 style={{ margin: 0 }}>{currentMonth.format('MMMM YYYY')}</h1>
            <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>
              Today: {moment().format('dddd, MMMM Do YYYY')}
            </div>
            <div style={{ fontSize: 12, color: '#777', marginTop: 2 }}>
              Current Time: {now.format('HH:mm:ss')} ({moment.tz.guess()})
            </div>
          </header>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={handlePrevMonth} style={{ padding: '8px 12px' }}>Previous</button>
            <button onClick={handleToday} style={{ padding: '8px 12px' }}>Today</button>
            <button onClick={handleNextMonth} style={{ padding: '8px 12px' }}>Next</button>
          </div>
        </div>

        <div className="calendar-right">
          <div style={{ marginBottom: 8 }}>
            <img
              src={getImageForMonth(currentMonth).url}
              alt="Monthly"
              style={{ width: '100%', height: 'auto', borderRadius: 8, objectFit: 'cover' }}
            />
            <div style={{ fontSize: 11, color: '#888', marginTop: 8, textAlign: 'center' }}>
              {getImageForMonth(currentMonth).caption}
            </div>
          </div>
        </div>

        <div className="calendar-left">
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

          {selectedDate && (
            <div style={{ marginTop: 16, padding: 8, border: '1px solid #eee', borderRadius: 6 }}>
              <strong>Selected:</strong> {selectedDate.format('dddd, MMMM Do YYYY')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
