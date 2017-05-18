import { h } from 'preact';
import styled from 'styled-components';

export default styled.div`
  background-image: ${props => props.theme.gradient.primary};
  min-height: 100vh;
  min-width: 320px;
  width: 100%;
`;
