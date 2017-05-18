import { h } from 'react';
import styled, { keyframes } from 'styled-components';

const DOT_SIZE = 10;

const fadeDelay = keyframes`
  0%, 80%, 100% {
    opacity: 0;
  }

  30%, 50% {
    opacity: 1;
  }
`;

const LoaderDot = styled.div`
  animation-name: ${fadeDelay};
  animation-delay: ${props => props.delay};
  animation-duration: 0.8s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 100%;
  display: inline-block;
  height: ${DOT_SIZE}px;
  margin-right: ${({ theme }) => theme.unit}px;
  vertical-align: middle;
  width: ${DOT_SIZE}px;
`;

LoaderDot.defaultProps = {
  delay: '0s',
};

export default LoaderDot;
