import { h } from 'preact';

import Icon from './Icon';
import LogoSvg from '../../svg/logo.svg';

export default function IconLogo(props) {
  return <Icon svg={LogoSvg} {...props} />;
}
