import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import { setDate } from '../actions/app';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  ...withStylesPropTypes,
  setDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.number,
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class SelectDate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focused: null,
      selectedDate: props.selectedDate ? moment(props.selectedDate) : null,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(selectedDate) {
    this.setState({ selectedDate });
    this.props.setDate(selectedDate.valueOf());
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    const { styles } = this.props;
    const { selectedDate, focused } = this.state;

    return (
      <div {...css(styles.container)}>
        <label
          {...css(styles.label)}
          htmlFor="date"
        >
          Take me back to
        </label>
        <SingleDatePicker
          id="date"
          date={selectedDate}
          isOutsideRange={day => moment().isSameOrBefore(day)}
          focused={focused}
          onFocusChange={this.onFocusChange}
          onDateChange={this.onDateChange}
        />
      </div>
    );
  }

}

SelectDate.propTypes = propTypes;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const SelectDateWithStyles = withStyles(({ font }) => ({
  container: {

  },
  label: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}))(SelectDate);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  selectedDate: state.app.get('selectedDate'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setDate }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectDateWithStyles);
