import React, { Component, PropTypes } from 'react';
import qs from 'qs';

import { css, withStyles, withStylesPropTypes } from '../utils/withStyles';
import LoginButton from '../containers/LoginButton';

const propTypes = {
  ...withStylesPropTypes,
  tracks: PropTypes.object,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  fetchTracks: PropTypes.func,
  isBootstrapped: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  setAccessToken: PropTypes.func,
};

const defaultProps = {
  tracks: {},
  isBootstrapped: false,
  isLoggedIn: false,
};

class App extends Component {

  constructor(props) {
    super(props);
    this.setAccessTokenIfNecessary = this.setAccessTokenIfNecessary.bind(this);
  }

  componentWillUpdate(prevProps) {
    if (prevProps.isBootstrapped !== this.props.isBootstrapped) {
      this.setAccessTokenIfNecessary();
    }
  }

  setAccessTokenIfNecessary() {
    const hash = window.location.hash.substring(1);
    const options = hash && qs.parse(hash);

    if (options && options.access_token) {
      this.props.setAccessToken(options.access_token);
    }
  }

  renderLoggedOut() {
    return <LoginButton />;
  }

  renderLoggedIn() {
    const { track: tracks, artist: artists } = this.props.tracks;
    return (
      <div>
        <h1>Hello!!</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={this.props.username}
            ref={node => (this.input = node)}
          />
          <button
            onClick={() => {
              const username = this.input.value;
              this.props.setUsername(username);
            }}
          >
              Set Username
            </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.props.fetchTracks();
            }}
          >
            Fetch Tracks
          </button>
          <ul>
            {tracks && Object.keys(tracks).map((id) => {
              const track = tracks[id];
              const artist = artists[track.artist];
              return <li>{artist['#text']} - “{track.name}”</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { isBootstrapped, isLoggedIn } = this.props;

    if (!isBootstrapped) return null;

    return (
      <div>
        {isLoggedIn ?
          this.renderLoggedIn() :
          this.renderLoggedOut()
        }
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
