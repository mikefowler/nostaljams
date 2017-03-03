import { h } from 'preact';

import LoginLastFMButton from '../containers/LoginLastFMButton';
import LoginSpotifyButton from '../containers/LoginSpotifyButton';

export default function LoginPage() {
  return (
    <div>
      <LoginSpotifyButton />
      <LoginLastFMButton />
    </div>
  );
}
