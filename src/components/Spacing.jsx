import styled from 'styled-components';

const Spacing = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => (props.top || props.vertical) * props.theme.unit}px;
  margin-right: ${props => (props.right || props.horizontal) * props.theme.unit}px;
  margin-bottom: ${props => (props.bottom || props.vertical) * props.theme.unit}px;
  margin-left: ${props => (props.left || props.horizontal) * props.theme.unit}px;
`;

Spacing.defaultProps = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  horizontal: 0,
  vertical: 0,
};

export default Spacing;
