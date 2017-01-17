import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  tracks: ImmutablePropTypes.orderedMap,
};

const defaultProps = {

};

function TrackList({ tracks }) {
  return (
    <ul>
      {tracks.valueSeq().map(track => (
        <li key={track.get('id')}>
          “{track.get('name')}” by {track.get('artist')} ({track.get('playCount')})
        </li>
      ))}
    </ul>
  );
}

TrackList.propTypes = propTypes;
TrackList.defaultProps = defaultProps;

const mapStateToProps = state => ({
  tracks: state.lastfm.get('tracks'),
});

export default connect(mapStateToProps)(TrackList);
