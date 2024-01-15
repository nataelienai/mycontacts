import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: start;

  span {
    color: ${({ theme }) => theme.colors.secondaryText};
    margin-left: 24px;
    word-break: break-word;
  }
`;
