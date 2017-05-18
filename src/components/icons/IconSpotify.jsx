import { h } from 'preact';

import Icon from './Icon';
import LogoSpotify from '../../svg/spotify.svg';

export default function IconSpotify(props) {
  return <Icon svg={LogoSpotify} {...props} />;
}
