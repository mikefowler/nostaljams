import { h } from 'preact';
import styled from 'styled-components';

function Icon({ svg, color: fill, size }) {
  const StyledIcon = styled(svg)`
    display: inline-block;
    fill: ${fill};
    width: ${size}px;
    height: ${size}px;
  `;

  return <StyledIcon />;
}

Icon.defaultProps = {
  color: '#fff',
};

export default Icon;
