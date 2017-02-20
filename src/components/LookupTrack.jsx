import React, { Component, PropTypes } from 'react';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

const propTypes = {
  ...withStylesPropTypes,
  lastFmId: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
};

const defaultProps = {

};

class LookupTrack extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    const { lookupTrack, name, artist } = this.props;

    lookupTrack({
      track: name,
      artist,
    });
  }

  render() {
    const { name, artist, styles } = this.props;

    return (
      <div {...css(styles.container)}>
        <p>“{name}” by {artist}</p>
      </div>
    );
  }

}

LookupTrack.propTypes = propTypes;
LookupTrack.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(LookupTrack);
