import React, { Component, PropTypes } from 'react';

import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';
import Chart from './Chart';

const propTypes = {
  ...withStylesPropTypes,
};

const defaultProps = {

};

class SelectChart extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    const { fetchWeeklyChartList } = this.props;

    fetchWeeklyChartList();
  }

  render() {
    const { charts, styles } = this.props;
    return (
      <div {...css(styles.container)}>
        {charts.valueSeq().map(c => (
          <Chart
            key={c.get('id')}
            id={c.get('id')}
            start={c.getStartDate()}
            end={c.getEndDate()}
          />
        ))}
      </div>
    );
  }

}

SelectChart.propTypes = propTypes;
SelectChart.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(SelectChart);
