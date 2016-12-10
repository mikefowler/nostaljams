import React from 'react';
import { connect } from 'react-redux';

import App from '../components/App';
import { fetchWeeklyTrackChart, setUsername } from '../actions/lastfm';
import { setAccessToken } from '../actions/auth';

const mapStateToProps = state => ({
  tracks: state.lastfm.tracks.entities,
  username: state.auth.lastfmUsername,
  isBootstrapped: state.app.isBootstrapped,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAccessToken(accessToken) {
    dispatch(setAccessToken(accessToken));
  },
  fetchTracks(startDate, endDate) {
    dispatch(fetchWeeklyTrackChart(startDate, endDate));
  },
  setUsername(username) {
    dispatch(setUsername(username));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
