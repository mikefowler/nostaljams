export const SELECT_DATE_RANGE = 'app/SELECT_DATE_RANGE';

export function selectDateRange(startDate, endDate) {
  return {
    type: SELECT_DATE_RANGE,
    payload: {
      start: startDate,
      end: endDate,
    },
  };
}
