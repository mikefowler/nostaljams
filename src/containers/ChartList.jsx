import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { getChartsInDateRange } from '../store/selectors';
import { css, withStyles } from '../utils/themes/withStyles';
import SelectDateRange from '../containers/SelectDateRange';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  charts: ImmutablePropTypes.orderedMap,
  selectedCharts: ImmutablePropTypes.orderedMap,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  selectedCharts: [],
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function ChartList({ charts, selectedCharts, styles }) {
  return (
    <div>
      <h2>Available Charts</h2>
      <SelectDateRange />
      <ul {...css(styles.container)}>
        {charts.valueSeq().map((chart) => {
          const startDate = chart.getStartDate();
          const endDate = chart.getEndDate();
          const isSelected = selectedCharts.has(chart.id);
          const formattedRange = `${startDate.format('L')}—${endDate.format('L')}`;
          const output = isSelected ? <b>{formattedRange}</b> : formattedRange;

          return (
            <li key={chart.id}>
              {output}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ChartList.propTypes = propTypes;
ChartList.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

const ChartListWithStyles = withStyles(() => ({
  container: {

  },
}))(ChartList);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  charts: state.lastfm.charts,
  selectedCharts: getChartsInDateRange(state),
});

export default connect(mapStateToProps)(ChartListWithStyles);
