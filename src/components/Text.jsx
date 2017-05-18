import styled from 'styled-components';

export default styled.p`
  ${({ theme }) => theme.font.default}
  color: ${({ contrast, theme }) => contrast ? theme.color.textLight : theme.color.textDark};
  text-align: ${({ center }) => center ? 'center' : 'left'};
`;
