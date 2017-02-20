import React, { PropTypes } from 'react';
import moment from 'moment';

import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';
import getNumbersInRange from '../utils/getNumbersInRange';
import getDatesForMonth from '../utils/getDatesForMonth';

const START_YEAR = 2002;
const INITIAL_YEAR = moment().year();
const POSSIBLE_YEARS = getNumbersInRange(START_YEAR, INITIAL_YEAR);

const propTypes = {
  ...withStylesPropTypes,
  value: PropTypes.number,
};

const defaultProps = {
  value: null,
};

class DatePicker extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const month = parseInt(this.month.value, 10);
    let date = parseInt(this.date.value, 10);
    const year = parseInt(this.year.value, 10);
    const dates = getDatesForMonth(month);

    if (!dates.includes(date)) {
      date = dates[0];
    }

    const nextDate = moment({ month, date, year });

    this.props.onChange(nextDate.valueOf());
  }

  render() {
    const { styles, value } = this.props;
    const date = moment(value, 'x');
    const dates = getDatesForMonth(date.month());

    return (
      <div {...css(styles.container)}>

        <select
          onChange={this.onChange}
          value={date.month()}
          ref={node => (this.month = node)}
        >
          {moment.months().map((monthName, monthValue) => (
            <option key={monthName} value={monthValue}>{monthName}</option>
          ))}
        </select>

        <select
          onChange={this.onChange}
          value={date.date()}
          ref={node => (this.date = node)}
        >
          {dates.map(dateNumber => (
            <option key={dateNumber} value={dateNumber}>{dateNumber}</option>
          ))}
        </select>

        <select
          onChange={this.onChange}
          value={date.year()}
          ref={node => (this.year = node)}
        >
          {POSSIBLE_YEARS.map(yearNumber => (
            <option key={yearNumber} value={yearNumber}>{yearNumber}</option>
          ))}
        </select>

      </div>
    );
  }

}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default withStyles(() => ({
  container: {
    display: 'inline-block',
  },
}))(DatePicker);
