import { OrderedMap } from 'immutable';
import { createSelector } from 'reselect';

const getSelectedDateRange = (state) => {
  const start = state.app.selectedStartDate;
  const end = state.app.selectedEndDate;

  return (start && end) ? { start, end } : null;
};

const getCharts = state => state.lastfm.charts;

export const getChartsInDateRange = createSelector(
  [getSelectedDateRange, getCharts],
  (dateRange, charts) => {
    if (!dateRange) return new OrderedMap();

    return charts.filter((chart) => {
      const rangeBeginsBeforeChart = dateRange.start <= chart.get('start');
      const rangeEndsAfterChart = dateRange.end >= chart.get('end');

      return rangeBeginsBeforeChart && rangeEndsAfterChart;
    });
  },
);
