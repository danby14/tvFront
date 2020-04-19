import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import subDays from 'date-fns/subDays';
import 'react-datepicker/dist/react-datepicker.css';

const Picker = ({ time }) => {
  const [startDate, setStartDate] = useState(new Date());

  let addTime = {};
  if (time === true) {
    addTime = {
      showTimeSelect: true,
      timeFormat: 'HH:mm',
      timeIntervals: 60,
      timeCaption: `time`,
      dateFormat: 'MMMM d, yyyy h:mm aa',
      minDate: subDays(new Date(), 2),
    };
  }
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      // peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode='select'
      {...addTime}
    />
  );
};

export default Picker;
