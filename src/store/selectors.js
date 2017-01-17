import { createSelector } from 'reselect';

const getSelectedDate = state => state.app.get('selectedDate');
const getCharts = state => state.lastfm.get('charts');

export const getChartsForDate = createSelector(
  [getSelectedDate, getCharts],
  (date, charts) => {
    if (!date) return null;

    // @TODO: allow this selector to specify a chart "delta" that
    // would return multiple charts. i.e. specifying a delta of 2 would
    // return up to 5 charts: the chart in range of getSelectedDate, and
    // the two closest charts on either side of it.

    return charts
      .filter(chart => chart.get('start') <= date && chart.get('end') >= date)
      .keySeq();
  },
);

export const getSelectedChart = createSelector(
  [getCharts, getChartsForDate],
  (allCharts, chartsInRange) => {
    if (!chartsInRange || !chartsInRange.size) return null;

    const chartId = chartsInRange.first();
    return allCharts.get(chartId);
  },
);
