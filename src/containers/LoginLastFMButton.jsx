import { h } from 'preact';
import { connect } from 'preact-redux';

import { LASTFM_API_KEY, LASTFM_REDIRECT_URI } from '../utils/constants';
import authenticateWithLastFM from '../utils/authenticateWithLastFM';
import { css, withStyles } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  isLoggedIn: state.lastfm.get('isLoggedIn'),
  user: state.lastfm.get('user'),
});

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

function LoginLastFMButton({ isLoggedIn, user, onPress, styles }) {
  if (isLoggedIn) {
    return (
      <div>
        <p>Logged in to Last.FM as {user}.</p>
      </div>
    );
  }

  return (
    <button
      {...css(styles.link)}
      onClick={onPress}
    >
      Log in to Last.FM
    </button>
  );
}

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const LoginLastFMButtonWithStyles = withStyles(() => ({
  link: {

  },
}))(LoginLastFMButton);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginLastFMButtonWithStyles);
