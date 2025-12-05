import React, { useState } from 'react';
import moment from 'moment-timezone';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const getRandomImageUrl = () => {
    const images = [
      'https://64.media.tumblr.com/8d4efda80fbbd83074b93efeef9e10d0/368d26a041dfae8c-37/s1280x1920/a4a31a7985b50a3a374e182943060ac8291b8d4b.jpg',
      'https://64.media.tumblr.com/6d16b8827b28b99153e1b7c6cb5fb957/36cc8e5d86f378a1-db/s1280x1920/c93cc7f7e19dd616d8139503f7d7bf5f2630407e.jpg',
      // Add more images
    ];
    const monthIndex = currentMonth.month();
    return images[monthIndex]; // Get image based on month
  };

  return (
    <div>
      <h1>{currentMonth.format('MMMM YYYY')}</h1>
      <img src={getRandomImageUrl()} alt="Monthly image" />
      <div>
        <button onClick={handlePrevMonth}>Previous</button>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <p>Current Time: {moment().tz("Your/Timezone").format('HH:mm:ss')}</p>
    </div>
  );
};

export default Calendar;