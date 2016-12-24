import 'react-dates/lib/css/_datepicker.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import { setDateRange } from '../actions/app';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  ...withStylesPropTypes,
  endDate: PropTypes.number,
  setDateRange: PropTypes.func.isRequired,
  startDate: PropTypes.number,
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class SelectDateRange extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: props.startDate ? moment(props.startDate) : null,
      endDate: props.endDate ? moment(props.endDate) : null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });

    // If both the start and end date have been selected, call the action
    // to update the dates in the Redux store
    if (startDate && endDate) {
      this.props.setDateRange({
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf(),
      });
    }
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { styles } = this.props;
    const { startDate, endDate, focusedInput } = this.state;

    return (
      <div {...css(styles.container)}>
        <DateRangePicker
          // Only allow today or days previous to be selected
          isOutsideRange={day => moment().isSameOrBefore(day)}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    );
  }

}

SelectDateRange.propTypes = propTypes;

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
  startDate: state.app.get('selectedStartDate'),
  endDate: state.app.get('selectedEndDate'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setDateRange,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectDateRangeWithStyles);
