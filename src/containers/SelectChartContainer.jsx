import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SelectChart from '../components/SelectChart';
import { fetchWeeklyChartList } from '../actions/lastfm';

const mapStateToProps = state => ({
  charts: state.lastfm.get('charts'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchWeeklyChartList }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectChart);
