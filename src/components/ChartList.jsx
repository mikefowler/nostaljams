import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { css, withStyles } from '../utils/withStyles';
import SelectDateRangeContainer from '../containers/SelectDateRangeContainer';

const propTypes = {
  charts: ImmutablePropTypes.orderedMap,
  selectedCharts: ImmutablePropTypes.orderedMap,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  selectedCharts: [],
};

function ChartList({ charts, selectedCharts, styles }) {
  return (
    <div>
      <h2>Available Charts</h2>
      <SelectDateRangeContainer />
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

export default withStyles(() => ({
  container: {

  },
}))(ChartList);
