import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import Button from '../components/Button';

import { LASTFM_API_KEY, LASTFM_REDIRECT_URI } from '../utils/constants';
import authenticateWithLastFM from '../utils/authenticateWithLastFM';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const mapDispatchToProps = () => ({
  onPress() {
    authenticateWithLastFM({
      api_key: LASTFM_API_KEY,
      cb: LASTFM_REDIRECT_URI,
    });
  },
});

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function LoginButtonLastFM({ onPress }) {
  return (
    <Button
      block
      onClick={onPress}
    >
      Log in to Last.FM
    </Button>
  );
}

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(
  undefined,
  mapDispatchToProps,
)(LoginButtonLastFM);
