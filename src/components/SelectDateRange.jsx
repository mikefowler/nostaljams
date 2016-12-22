import React, { Component, PropTypes } from 'react';

import { css, withStyles } from '../utils/withStyles';
import dateStringToTimestamp from '../utils/dateStringToTimestamp';
import timestampToDateString from '../utils/timestampToDateString';

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

export default withStyles(() => ({
  container: {

  },
}))(SelectDateRange);
