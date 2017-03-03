import { h } from 'preact';

import { css, withStyles } from '../utils/themes/withStyles';

function Chart({
  number,
  id,
  start,
  end,
  styles,
}) {
  return (
    <a href={`/chart/${id}`}>
      <div {...css(styles.container)}>
        <legend>{number}</legend>
        <p>From {start.format('LL')} to {end.format('LL')}</p>
      </div>
    </a>
  );
}

export default withStyles(() => ({
  container: {
    padding: '1em',
    margin: '0.5em 0',
    border: '1px solid lightgrey',
  },
}))(Chart);
