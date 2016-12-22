// @TODO: remove next line once there are multiple exports
/* eslint-disable import/prefer-default-export */

import { OrderedMap, Seq } from 'immutable';
import { createSelector } from 'reselect';

const getSelectedDateRange = (state) => {
  const start = state.app.get('selectedStartDate');
  const end = state.app.get('selectedEndDate');

  return (start && end) ? { start, end } : null;
};

const getCharts = state => state.lastfm.get('charts');

export const getChartsInDateRange = createSelector(
  [getSelectedDateRange, getCharts],
  (dateRange, charts) => {
    if (!dateRange) return null;

    return charts.filter((chart) => {
      const rangeBeginsBeforeChart = dateRange.start <= chart.get('start');
      const rangeEndsAfterChart = dateRange.end >= chart.get('end');

      return rangeBeginsBeforeChart && rangeEndsAfterChart;
    }).keySeq();
  },
);
