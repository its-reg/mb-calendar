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
      'url_to_image_1',
      'url_to_image_2',
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