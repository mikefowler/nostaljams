import { h } from 'preact';

import Icon from './Icon';
import LogoLastFm from '../../svg/lastfm.svg';

export default function IconLastFm(props) {
  return <Icon svg={LogoLastFm} {...props} />;
}
