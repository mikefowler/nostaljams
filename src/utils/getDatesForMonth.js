import moment from 'moment';

// Given a zero-based month index, this helper returns an array
// of the day numbers for that month. I.E., if 0 (January) is passed
// as an argument, an array with values between 1 and 31, inclusive,
// will be returned.
export default function getDatesForMonth(month) {
  const totalDaysInMonth = moment({ month }).daysInMonth();
  const datesForMonth = [];

  for (let i = 1; i <= totalDaysInMonth; i += 1) {
    datesForMonth.push(i);
  }

  return datesForMonth;
}
