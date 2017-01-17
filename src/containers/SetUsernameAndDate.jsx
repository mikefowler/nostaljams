import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateUsername from '../containers/UpdateUsername';
import SelectDate from '../containers/SelectDate';
import { getSelectedChart } from '../store/selectors';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';
import { fetchChartsForWeek } from '../actions/lastfm';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  ...withStylesPropTypes,
  username: PropTypes.string.isRequired,
  fetchChartsForWeek: PropTypes.func.isRequired,
};

const defaultProps = {

};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function SetUsernameAndDate(props) {
  const {
    selectedDate,
    selectedChart,
    styles,
    username,
  } = props;

  const onPress = () => {
    props.fetchChartsForWeek(
      selectedChart.get('start') / 1000,
      selectedChart.get('end') / 1000,
    );
  };

  return (
    <div {...css(styles.container)}>
      <UpdateUsername />
      {username && <SelectDate />}
      {username && selectedDate && selectedChart && (
        <button onClick={onPress}>Go</button>
      )}
    </div>
  );
}

SetUsernameAndDate.propTypes = propTypes;
SetUsernameAndDate.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

const SetUsernameAndDateWithStyles = withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(SetUsernameAndDate);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  username: state.lastfm.get('username'),
  selectedDate: state.app.get('selectedDate'),
  selectedChart: getSelectedChart(state),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchChartsForWeek }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetUsernameAndDateWithStyles);
