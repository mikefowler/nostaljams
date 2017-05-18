import styled from 'styled-components';

const Centered = styled.div`
  display: flex;
  align-items: ${props => props.horizontal ? 'center' : 'initial'};
  justify-content: ${props => props.vertical ? 'center' : 'initial'};
  flex: 1;
  flex-direction: column;
`;

export default Centered;
