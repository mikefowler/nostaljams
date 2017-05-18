import styled from 'styled-components';

export default styled.h1`
  ${props => props.theme.font.title1}
  color: ${props => props.contrast ? props.theme.color.textLight : props.theme.color.textDark};
  margin: 0;
`;
