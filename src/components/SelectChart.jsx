import { h, Component } from 'preact';

import { css, withStyles } from '../utils/themes/withStyles';
import Chart from './Chart';

class SelectChart extends Component {

  componentDidMount() {
    const { fetchWeeklyChartList } = this.props;

    fetchWeeklyChartList();
  }

  render() {
    const { charts, styles } = this.props;

    return (
      <div {...css(styles.container)}>
        {charts.toArray().map(c => (
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

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(SelectChart);
