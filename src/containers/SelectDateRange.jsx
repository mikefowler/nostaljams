import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/app';
import { css, withStyles } from '../utils/themes/withStyles';
import dateStringToTimestamp from '../utils/dateStringToTimestamp';
import timestampToDateString from '../utils/timestampToDateString';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  endDate: PropTypes.number,
  selectDateRange: PropTypes.func,
  startDate: PropTypes.number,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  endDate: null,
  selectDateRange() {},
  startDate: null,
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class SelectDateRange extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate: timestampToDateString(props.startDate),
      endDate: timestampToDateString(props.endDate),
    };
  }

  render() {
    const { selectDateRange, styles } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <div {...css(styles.container)}>
        <input
          placeholder="From"
          type="date"
          value={startDate}
          onChange={e => this.setState({ startDate: e.target.value })}
        />
        <input
          placeholder="To"
          type="date"
          value={endDate}
          onChange={e => this.setState({ endDate: e.target.value })}
        />
        <button
          onClick={() => {
            selectDateRange(
              dateStringToTimestamp(this.state.startDate),
              dateStringToTimestamp(this.state.endDate),
            );
          }}
        >
          Find Charts
        </button>
      </div>
    );
  }

}

SelectDateRange.propTypes = propTypes;
SelectDateRange.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const SelectDateRangeWithStyles = withStyles(() => ({
  container: {

  },
}))(SelectDateRange);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  startDate: state.app.selectedStartDate,
  endDate: state.app.selectedEndDate,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    selectDateRange: actions.selectDateRange,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectDateRangeWithStyles);
