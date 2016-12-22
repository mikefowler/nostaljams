export const SELECTED_DATE_RANGE = 'app/SELECTED_DATE_RANGE';

export function selectDateRange(startDate, endDate) {
  return {
    type: SELECTED_DATE_RANGE,
    payload: {
      start: startDate,
      end: endDate,
    },
  };
}
