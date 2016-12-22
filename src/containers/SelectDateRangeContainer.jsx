import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectDateRange } from '../actions/app';
import SelectDateRange from '../components/SelectDateRange';

const mapStateToProps = state => ({
  startDate: state.app.selectedStartDate,
  endDate: state.app.selectedEndDate,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ selectDateRange }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectDateRange);
