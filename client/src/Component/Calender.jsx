import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar() {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    // Check if the date is already selected
    if (!selectedDates.includes(date)) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const removeDate = (dateToRemove) => {
    const updatedDates = selectedDates.filter((date) => date !== dateToRemove);
    setSelectedDates(updatedDates);
  };

  // Format options for toLocaleDateString()
  const dateFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const confrim = ()=>{

    // eslint-disable-next-line array-callback-return
    selectedDates.map((date)=>{
        console.log(date);
    })
  }

  return (
    <div>
      <h2>Selected Dates:</h2>
      <ul>
        {selectedDates.map((date) => (
          <li key={date.toString()}>
            {new Date(date).toLocaleDateString('en-US', dateFormatOptions).replace(/\//g, '/')} {/* Convert and format */}
            <button onClick={() => removeDate(date)}>Remove</button>
          </li>
        ))}
      </ul>
      <DatePicker
        selected={null}
        onChange={handleDateChange}
        inline
        calendarClassName="calendar"
        isClearable
        showYearDropdown
        dateFormat="dd/MM/yyyy" 
        selectsRange
        startDate={selectedDates.length > 0 ? selectedDates[0] : null}
        endDate={selectedDates.length > 0 ? selectedDates[selectedDates.length - 1] : null}
      />

      <button onClick={confrim}>confrim</button>
    </div>
  );
}

export default Calendar;
