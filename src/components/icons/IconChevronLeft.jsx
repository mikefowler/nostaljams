import { h } from 'preact';

import Icon from './Icon';
import LogoChevronLeft from '../../svg/chevron-left.svg';

export default function IconChevronLeft(props) {
  return <Icon svg={LogoChevronLeft} {...props} />;
}
