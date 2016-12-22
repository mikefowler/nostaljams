import { connect } from 'react-redux';

import { getChartsInDateRange } from '../store/selectors';
import ChartList from '../components/ChartList';

const mapStateToProps = state => ({
  charts: state.lastfm.charts,
  selectedCharts: getChartsInDateRange(state),
});

export default connect(mapStateToProps)(ChartList);
