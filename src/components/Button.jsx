import styled from 'styled-components';

export default styled.button`
  ${({ theme }) => theme.font.default}
  flex: ${({ block }) => block ? 1 : 'initial'};
  background: none;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.color.white};
  color: white;
  cursor: pointer;
  padding: ${({ theme }) => theme.unit * 2}px;
`;
