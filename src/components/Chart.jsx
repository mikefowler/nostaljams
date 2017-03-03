import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import momentPropTypes from 'react-moment-proptypes';

import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

const propTypes = {
  ...withStylesPropTypes,
  id: PropTypes.number,
  start: momentPropTypes.momentObj,
  end: momentPropTypes.momentObj,
  number: PropTypes.number,
};

function Chart({
  number,
  id,
  start,
  end,
  styles,
}) {
  return (
    <Link to={{ pathname: '/chart', query: { id } }}>
      <div {...css(styles.container)}>
        <legend>{number}</legend>
        <p>From {start.format('LL')} to {end.format('LL')}</p>
      </div>
    </Link>
  );
}

Chart.propTypes = propTypes;

export default withStyles(() => ({
  container: {
    padding: '1em',
    margin: '0.5em 0',
    border: '1px solid lightgrey',
  },
}))(Chart);
