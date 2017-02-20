import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchChartsForWeek } from '../actions/lastfm';
import ChartPage from '../components/ChartPage';
import { getPlaylistForChart } from '../store/selectors';

const mapStateToProps = state => ({
  charts: state.lastfm.get('charts'),
  user: state.lastfm.get('user'),
  playlist: getPlaylistForChart(state),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchChartsForWeek }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);
