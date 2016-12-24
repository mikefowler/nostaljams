// @TODO: remove next line once there are multiple exports
/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';

const getSelectedDate = state => state.app.get('selectedDate');
const getCharts = state => state.lastfm.get('charts');

export const getChartsForDate = createSelector(
  [getSelectedDate, getCharts],
  (date, charts) => {
    if (!date) return null;

    return charts
      .filter(chart => chart.get('start') <= date && chart.get('end') >= date)
      .keySeq();
  },
);
