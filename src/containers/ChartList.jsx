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
  selectedCharts: ImmutablePropTypes.seq,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {

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
        {selectedCharts && selectedCharts.map((id) => {
          const chart = charts.get(id);
          const startDate = chart.getStartDate();
          const endDate = chart.getEndDate();

          return (
            <li key={chart.id}>
              {startDate.format('L')}—{endDate.format('L')}
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
  charts: state.lastfm.get('charts'),
  selectedCharts: getChartsInDateRange(state),
});

export default connect(mapStateToProps)(ChartListWithStyles);
