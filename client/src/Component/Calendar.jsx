import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendars() {
	const [value, setChange] = useState(new Date());

    const dates = [new Date(2023, 8, 30), new Date(2023, 9, 15)];
	const [temp, settemp] = useState(new Date());

    // console.log(dates.toDateString())
	// Add a console.log to see the value whenever it changes

    const click = (date)=>{
        console.log(value);
        settemp(isSameDate(value))
        console.log(temp);
        // if (
        //     !dates.some((blockedDate) =>
        //       isSameDate(date, blockedDate)
        //     )
        //   ) {
        //     setChange(date); // Update the state only if it's valid
        //   }  else {
        //     alert('Selected date is already blocked.');
        //   }
    }
    const isSameDate = ( date2) => {
        return (
            date2.getDate()  && date2.getMonth() && date2.getFullYear()
        //   date1.getDate() === date2.getDate() &&
        //   date1.getMonth() === date2.getMonth() &&
        //   date1.getFullYear() === date2.getFullYear()
        );
      };

	return (
		<div>
			<h1>Calendar - GeeksforGeeks</h1>
			<Calendar
				onChange={setChange}
				value={value}
                minDate={new Date()}

                onClickDay={click}
                
			/>
		</div>
	);
}
